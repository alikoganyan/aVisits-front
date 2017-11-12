import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class AuthenticationService {
    public stepsData: any = {};

    constructor(private http: Http) {
    }

    authenticationStepOne(email: string, phone: string) {
        return this.http.post('/user/signin', JSON.stringify({ email: email, phone: phone }))
            .map(res => res.json())
            .do(data => this.stepsData = data);
    }

    authenticationSelectChain(chainId: string) {
        this.stepsData = Object.assign({}, this.stepsData, { selectedChain: chainId });
    }

    login(password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({ email: this.stepsData.user.email, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return response;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}

export const AUTHENTICATION_PROVIDERS: Array<any> = [
    { provide: AuthenticationService, useClass: AuthenticationService }
];