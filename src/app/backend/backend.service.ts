import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { UserService } from "../auth/_services/user.service";
import { Observable } from "rxjs/Observable";
import { User } from "../auth/_models/user";

@Injectable()
export class BackendService {
    public static apiUrl = 'http://api.avisits.com/api/';
    public static headers = new Headers({ 'Content-Type': 'application/json' });
    private token: string;

    constructor(private http: Http,
        private userService: UserService) {

        this.userService.currentUser
            .subscribe(
            user => {
                this.token = user.token;
            });
    }

    public get(url: string): Observable<any> {
        return this.http.get(
            BackendService.apiUrl + url + this.getTokenParameter(),
            { headers: BackendService.headers });
    }

    public post(url: string, data: any): Observable<any> {
        return this.http.post(
            BackendService.apiUrl + url + this.getTokenParameter(),
            JSON.stringify(data),
            { headers: BackendService.headers });
    }

    public put(url: string, data: any): Observable<any> {
        return this.http.put(
            BackendService.apiUrl + url + this.getTokenParameter(),
            JSON.stringify(data),
            { headers: BackendService.headers });
    }

    public delete(url: string): Observable<any> {
        return this.http.delete(
            BackendService.apiUrl + url + this.getTokenParameter());
    }

    getTokenParameter(): string {
        if (!this.token) return '';

        return `?token=${this.token}`;
    }

}
