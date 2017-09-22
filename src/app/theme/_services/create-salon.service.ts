import {Http, Headers, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";


@Injectable()
export class CreateSalonService {
    constructor(private http: Http) {
    }

    private headers = new Headers({'Content-Type': 'application/json'});

    createSalon(title,
                country,
                city,
                address,
                latitude,
                longitude): Observable<any> {

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        return this.http.post(
            'http://192.168.0.116:8095/api/' + currentUser.chain.id + '/salon/?token=' + currentUser.token,
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
                    return response.json()
                }
            )
    }
}
