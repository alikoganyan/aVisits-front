import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) {
    }

    login(email: string, password: string) {
        return this.http.post(
            'http://192.168.0.116:8095/api/user/signin',
            { email: email, password: password },
            { headers: new Headers({ 'Content-Type': 'application/json' }) }
        )
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user.user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
                /*const token = response.json().token;
                /!* Parse token *!/
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                return {token: token, decoded: JSON.parse(window.atob(base64))};*/
            });
    }



    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}