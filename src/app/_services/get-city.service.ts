import {Injectable} from '@angular/core';
import {Http, Headers, Response, Jsonp} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class GetCityService {

    chain = new Subject<any>();

    constructor(private http: Http,
                private jsonp: Jsonp) {
    }

    getCountries(): Observable<any> {
        return this.jsonp.request('https://api.vk.com/api.php?oauth=1&method=database.getCountries&v=5.5&need_all=1&count=1000&callback=JSONP_CALLBACK')
            .map(
                (response: Response) => {
                    return response.json()
                }
            )
    }

    getCities(id: number, text:string): Observable<any> {
        return this.jsonp.request('https://api.vk.com/api.php?oauth=1&method=database.getCities&v=5.5&country_id='+ id +'&offset=0&need_all=1&count=10&q=' + text +'&callback=JSONP_CALLBACK')
            .map(
                (response: Response) => {
                    return response.json()
                }
            )
    }

    getStreet(country: string, city: string, street: string): Observable<any> {
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ country +'+'+ city + '+' + street +'&callback=JSONP_CALLBACK&key=AIzaSyD4AD-6nrr-uDDkblQh3TeJhbMfg8xWOys')
            .map(
                (response: Response) => {
                    return response.json()
                }
            )
    }


}
