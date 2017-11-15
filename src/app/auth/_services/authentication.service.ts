import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { BackendService } from "../../backend/backend.service";
import { UserService } from "./user.service";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {BackendBaseService} from "../../backend/backend-base.service";

@Injectable()
export class AuthenticationService {
    storageKey: string = 'authData';
    data: any = {};
    public currentAuthData: BehaviorSubject<any> = new BehaviorSubject<any>({});

    constructor(private backend: BackendBaseService,
                public userService: UserService) {

        let data = JSON.parse(localStorage.getItem(this.storageKey));
        if(data) {
            this.extendAuthData(data);
        }
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
            .do(data => this.extendAuthData(data.data));
    }

    authenticationSelectChain(chainId: string) {
        this.extendAuthData({ selectedChain: chainId });
    }

    extendAuthData(data): void {
        this.extendAuthDataCore(data);
        if(data.user) {
            this.userService.setCurrentUser(data.user);
        }
    }

    extendAuthDataCore(data): void {
        this.data = Object.assign({}, this.data, data);
        this.currentAuthData.next(this.data);

        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    login(password: string) {
        return this.backend.post(this.data.selectedChain + '/user/login', { email: this.data.user.email, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let data = response.json();
                if (data && data.token) {
                    this.extendAuthData(data);
                }

                return response;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(this.storageKey);
    }
}

export const AUTHENTICATION_PROVIDERS: Array<any> = [
    { provide: AuthenticationService, useClass: AuthenticationService }
];