import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {Subject} from "rxjs/Subject";


@Injectable()
export class CreateSalonService {
    constructor(private http: Http) {
    }
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private headers = new Headers({ 'Content-Type': 'application/json' });


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
            { headers: this.headers })
            .map((response: Response) => {
                let data = response.json();
                return data;
            })
    }


    createNewSalon(timePickers) {
      return this.http.post(
            'http://api.avisits.com/api/' + this.currentUser.chain.id + '/salon?token=' + this.currentUser.token,
            JSON.stringify(timePickers),
            {headers: this.headers}
            )
          .map((response: Response) => {
              let data = response.json();
              return data;
          })
    }

    getSalons() {
       return this.http.get('http://api.avisits.com/api/' + this.currentUser.chain.id + '/salon?token=' + this.currentUser.token)
            .map((response: Response) => {
                let data = response.json();
                return data;
            })
    }

}
