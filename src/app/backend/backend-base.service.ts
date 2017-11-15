import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BackendBaseService {
    apiUrl = 'http://api.avisits.com/api/';
    headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) {
    }

    protected prepareUrl(url: string): string {
        return this.apiUrl + url;
    }

    public get(url: string): Observable<any> {
        return this.http.get(
            this.prepareUrl(url),
            { headers: this.headers });
    }

    public post(url: string, data: any): Observable<any> {
        return this.http.post(
            this.prepareUrl(url),
            JSON.stringify(data),
            { headers: this.headers });
    }

    public put(url: string, data: any): Observable<any> {
        return this.http.put(
            this.prepareUrl(url),
            JSON.stringify(data),
            { headers: this.headers });
    }

    public delete(url: string): Observable<any> {
        return this.http.delete(this.prepareUrl(url));
    }
}
