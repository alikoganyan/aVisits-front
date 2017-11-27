import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as fromAuth from '../reducers';
import * as Auth from '../actions/auth';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/take";

@Injectable()
export class SigninGuardBase implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<fromAuth.State>
        ) {
    }

    canActivate(): Observable<boolean> {
        return this.store
            .select(fromAuth.getTotalUserChains)
            .map(totalUserChains => {
                if(totalUserChains === 0) {
                    this.store.dispatch(new Auth.LoginRedirect());
                    return false;
                }
                return true;
            })
            .take(1);
    }
    //
    // canActivateCore(): boolean {
        // return !!this.getAuthData();
    // }

    // getAuthData(): any {
    //     return this.authService.currentAuthData.getValue();
    // }

}
