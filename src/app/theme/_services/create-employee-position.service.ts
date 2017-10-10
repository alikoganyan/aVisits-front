import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";


@Injectable()
export class CreateEmployeePositionService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private currentUser = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getPositions() {
        return this.http.post(
            "http://api.avisits.com/api/" + this.currentUser.chain.id + "/position_index?token=" + this.currentUser.token,
            {}
        )
            .map(
                (response: Response) => {
                    let data = response.json();
                    return data;
                }
            )
    }


}
