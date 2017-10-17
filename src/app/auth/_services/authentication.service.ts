import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class AuthenticationService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) {
    }

    login(body: any) {
        return this.http.post(
            'http://api.avisits.com/api/user/signin',
            JSON.stringify(body),
            { headers: this.headers }
        )
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                return user;
            });
    }

    enter(email: string, password: string, chainId: number) {
        return this.http.post(
            'http://api.avisits.com/api/' + chainId + '/user/login',
            { email: email, password: password },
            { headers: this.headers }
        )
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user.user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentSalon');
    }
}