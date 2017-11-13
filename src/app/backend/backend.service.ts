import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { UserService } from "../auth/_services/user.service";
import { Observable } from "rxjs/Observable";
import { User } from "../auth/_models/user";

@Injectable()
export class BackendService {
    private baseUrl = 'http://api.avisits.com/api/';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private token: string;

    constructor(private http: Http,
        private userService: UserService) {

        this.userService.currentUser
            .subscribe(
            (user: User) => {
                this.token = user.token;
            });
    }

    public get(url: string): Observable<any> {
        return this.http.get(
            this.baseUrl + url + this.getTokenParameter(),
            { headers: this.headers });
    }

    public post(url: string, data: any): Observable<any> {
        return this.http.post(
            this.baseUrl + url + this.getTokenParameter(),
            JSON.stringify(data),
            { headers: this.headers });
    }

    public put(url: string, data: any): Observable<any> {
        return this.http.put(
            this.baseUrl + url + this.getTokenParameter(),
            JSON.stringify(data),
            { headers: this.headers });
    }

    public delete(url: string): Observable<any> {
        return this.http.delete(
            this.baseUrl + url + this.getTokenParameter());
    }

    getTokenParameter(): string {
        if (!this.token) return '';

        return `?token=${this.token}`;
    }

}
