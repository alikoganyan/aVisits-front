import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { BackendService } from "../../backend/backend.service";
import { UserService } from "./user.service";

@Injectable()
export class AuthenticationService {
    public stepsData: any = {};

    constructor(
        private backend: BackendService,
        private userService: UserService) {
    }

    authenticationStepOne(email: string, phone: string) {
        let data: any = {};
        if (email) {
            data.email = email;
        }
        if (phone) {
            data.phone = phone;
        }

        return this.backend.post('user/signin', data)
            .map(res => res.json())
            .do(data => this.stepsData = data.data);
    }

    authenticationSelectChain(chainId: string) {
        this.stepsData = Object.assign({}, this.stepsData, { selectedChain: chainId });
    }

    login(password: string) {
        return this.backend.post(this.stepsData.selectedChain + '/user/login', { email: this.stepsData.user.email, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    this.userService.setCurrentUser(user);
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