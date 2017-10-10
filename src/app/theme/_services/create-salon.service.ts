import {Http, Headers, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";


@Injectable()
export class CreateSalonService {
    constructor(private http: Http) {
    }
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private headers = new Headers({'Content-Type': 'application/json'});

    createSalon(title,
                country,
                city,
                address,
                latitude,
                longitude): Observable<any> {

        return this.http.post(
            'http://api.avisits.com/api/' + this.currentUser.chain.id + '/salon?token=' + this.currentUser.token,
            {
                title: title,
                country: country,
                city: city,
                address: address,
                latitude: latitude,
                longitude: longitude
            },
            {headers: this.headers})
            .map(
                (response: Response) => {
                    let data = response.json();
                    return data;
                }
            )
    }
}
