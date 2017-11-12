import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {UserService} from "../auth/_services/user.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BackendService {
    private baseUrl = 'http://api.avisits.com/api/';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private token: string;

    constructor(private http: Http,
                private userService: UserService) {
        let user = JSON.parse(localStorage.getItem('user'));
        this.token = user && user.token;
    }

    public get(url: string): Observable<any> {
        return this.http.get(
            this.baseUrl + url + '?token=' + this.token);
    }

    public post(url: string, data: any): Observable<any> {
        return this.http.post(
            this.baseUrl + url + '?token=' + this.token,
            JSON.stringify(data));
    }

    public put(url: string, data: any): Observable<any> {
        return this.http.put(
            this.baseUrl + url + '?token=' + this.token,
            JSON.stringify(data));
    }

    public delete(url: string): Observable<any> {
        return this.http.delete(
            this.baseUrl + url + '?token=' + this.token);
    }


}
