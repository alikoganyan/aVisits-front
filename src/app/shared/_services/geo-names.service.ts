import { Injectable } from '@angular/core';
import { Http, Jsonp } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class GeoNamesService {


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
        return this.jsonp.request('https://api.vk.com/api.php?oauth=1&method=database.getCities&v=5.5&country_id=' + id + '&offset=0&need_all=1&count=10&q=' + text + '&callback=JSONP_CALLBACK')
            .map((response) => response.json())
    }

    getStreet(country: string, city: string, street: string): Observable<any> {
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + country + '%20' + city + '%20' + street + '&callback=JSONP_CALLBACK&key=AIzaSyD4AD-6nrr-uDDkblQh3TeJhbMfg8xWOys')
            .map(
            (response) => response.json()
            )
    }

}
