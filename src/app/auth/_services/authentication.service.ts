import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { UserService } from "./user.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {BackendBaseService} from "../../backend/backend-base.service";

@Injectable()
export class AuthenticationService {
    authDataKey: string = 'authData';
    tokenKey: string = 'token';
    data: any = {};
    public currentAuthData: BehaviorSubject<any> = new BehaviorSubject<any>({});

    constructor(private backend: BackendBaseService,
                public userService: UserService) {

        let data = JSON.parse(localStorage.getItem(this.authDataKey));
        if(data) {
            this.extendAuthData(data);
        }
    }

    authenticationStepOne(login: string) {
        let credentials: any = {
            login: login
        };

        this.extendAuthData({credentials: credentials});

        return this.backend.post('user/signin', credentials)
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

        if(data.token) {
            localStorage.setItem(this.tokenKey, JSON.stringify(data.token));
        }

        localStorage.setItem(this.authDataKey, JSON.stringify(this.data));
    }

    login(password: string) {
        this.data.credentials = Object.assign({}, this.data.credentials, { password: password });

        return this.backend.post(this.data.selectedChain + '/user/login', this.data.credentials)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let data = response.json();
                if (data && data.token) {
                    this.extendAuthData(data);
                }

                return response;
            });
    }

    requestRecoveryCode(recoveryData: any) {
        this.extendAuthDataCore(recoveryData);
        return this.backend.post('user/forgot-password', JSON.stringify(recoveryData)).map((response: Response) => response.json());
    }

    resetPassword(resetData: any) {
        return this.backend.post('user/reset-password', JSON.stringify(resetData)).map((response: Response) => response.json());
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(this.authDataKey);
        localStorage.removeItem(this.tokenKey);
    }
}

export const AUTHENTICATION_PROVIDERS: Array<any> = [
    { provide: AuthenticationService, useClass: AuthenticationService }
];