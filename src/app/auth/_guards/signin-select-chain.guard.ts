import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SigninGuardBase} from "./signin-guard-base";

@Injectable()
export class SigninSelectChainGuard extends SigninGuardBase {
    canActivateCore(): boolean {
        return super.canActivateCore() && this.getAuthData().user;
    }

}

