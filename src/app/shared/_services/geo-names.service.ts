import { Injectable } from '@angular/core';
import { Http, Jsonp } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/scan";

@Injectable()
export class GeoNamesService {
    static googleMapsApiKey = 'AIzaSyD4AD-6nrr-uDDkblQh3TeJhbMfg8xWOys';

    constructor(private http: Http,
        private jsonp: Jsonp) {
    }

    getCountries(): Observable<any> {
        return this.jsonp.request('https://api.vk.com/api.php?oauth=1&method=database.getCountries&v=5.5&need_all=1&count=1000&callback=JSONP_CALLBACK')
            .map(
            (response) => response.json()
            )
    }

    getCities(id: string, text: string = ''): Observable<any> {
        text = text || '';
        return this.jsonp.request('https://api.vk.com/api.php?oauth=1&method=database.getCities&v=5.5&country_id=' + id + '&offset=0&need_all=1&count=10&q=' + text + '&callback=JSONP_CALLBACK')
            .map((response) => response.json())
    }

    getStreet(country: string, city: string, street: string): Observable<any> {
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + country + '%20' + city + '%20' + street + '&callback=JSONP_CALLBACK&key=' + GeoNamesService.googleMapsApiKey)
            .map((response) => response.json())
    }

    latLngToAddress(lat: number, lng: number): Observable<any> {
        let addressParts = ['route', 'street_number'];
        let componentTypeMap = {
            'premise': addressParts,
            'street_address': addressParts,
            'country': ['country'],
            'route': ['route'],
            'locality': ['locality']
        };
        let searchTypes = Object.keys(componentTypeMap);

        return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GeoNamesService.googleMapsApiKey}`)
            .map((response) => response.json())
            .flatMap(r => r.results)
            .map(r => (<any>r))
            .filter(a => a.types.some(t => searchTypes.indexOf(t) > -1))
            .map(a => {
                let type = a.types.filter(t => searchTypes.indexOf(t) > -1)[0];
                let components = a.address_components
                    .filter(c =>
                        c.types.some(t =>
                            componentTypeMap[type].indexOf(t) > -1
                        )
                    );
                let componentName = components.reverse()
                    .reduce((acc, cur) => {
                        return `${acc} ${cur.long_name}`
                    }, '')
                    .trim();

                return {type: type, title: componentName}
            })
            .filter(a => !!a.title)
            .scan((acc, i) => { acc.push(i); return acc; }, [])
            .filter(acc => acc.length >= 3) //filter incomplete address
    }
}
