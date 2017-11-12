import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from "../_services/authentication.service";
import {SigninGuardBase} from "./signin-guard-base";

@Injectable()
export class SigninEnterPasswordGuard extends SigninGuardBase {
    canActivateCore(): boolean {
        return super.canActivateCore() && this.getUser().chains;
    }

}
