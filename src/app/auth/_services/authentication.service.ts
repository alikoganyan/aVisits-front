import {Injectable} from "@angular/core";
import {Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {UserService} from "./user.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {BackendBaseService} from "../../backend/backend-base.service";
import {Credentials, RegisterInfo} from "../_models/user";
import {Observable} from "rxjs/Observable";
import {createNgModuleFactory} from "@angular/core/src/view";
import * as fromAuth from '../reducers';
import {Store} from "@ngrx/store";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/exhaustMap";
import {AuthConfig, AuthHttp} from "angular2-jwt";

@Injectable()
export class AuthenticationService {
    public selectedChainId$ = this.store$.select(fromAuth.getSelectedChainId);
    public token$ = this.store$.select(fromAuth.getToken);

    constructor(private backend: BackendBaseService,
                private store$: Store<fromAuth.State>) {
    }

    authenticationStepOne(credentials: Credentials): Observable<any> {
        return this.backend.post('user/signin', credentials)
            .map(res => res.json().data.chains)
    }


    login(password: string) {
        return Observable
            .combineLatest(
                this.store$.select(fromAuth.getCredentials),
                this.selectedChainId$)
            .take(1)
            .exhaustMap(([credentials, selectedChainId]) => this.backend
                .post(`${selectedChainId}/user/login`, {
                    login: (<any>credentials).login,
                    password: password
                })
                .map(resp => resp.json())
            );
    }

    signup(regInfo: RegisterInfo): Observable<any> {
        return this.backend.post('user/signup', regInfo)
            .map(response => response.json());
    }

    requestRecoveryCode(recoveryData: any) {
        return this.backend.post('user/forgot-password', JSON.stringify(recoveryData)).map((response: Response) => response.json());
    }

    resetPassword(resetData: any) {
        return this.backend.post('user/reset-password', JSON.stringify(resetData)).map((response: Response) => response.json());
    }

    logout() {
        // remove user from local storage to log user out
        // localStorage.removeItem(this.authDataKey);
        // localStorage.removeItem(this.tokenKey);
    }
}

export const AUTHENTICATION_PROVIDERS: Array<any> = [
    {provide: AuthenticationService, useClass: AuthenticationService}
];