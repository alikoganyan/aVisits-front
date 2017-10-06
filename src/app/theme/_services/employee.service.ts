import {Http, Headers, Response} from "@angular/http";
import {Injectable} from "@angular/core";


@Injectable()
export class EmployeeService {

    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

   /* getPositions() {
       return this.http.get(
           'http://api.avisits.com/api/' + this.currentUser.chain.id + '/service?token=' + this.currentUser.token
       )
           .map(
               (response: Response) => {
                   let data = response.json();
                   return data;
               }
           )
    }*/


}