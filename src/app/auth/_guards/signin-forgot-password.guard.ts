import {Injectable} from '@angular/core';
import {SigninGuardBase} from "./signin-guard-base";

@Injectable()
export class SigninForgotPasswordGuard extends SigninGuardBase {
    canActivateCore(): boolean {
        return super.canActivateCore() && this.getAuthData().credentials;
    }
}
