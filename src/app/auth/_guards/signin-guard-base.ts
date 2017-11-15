import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from "../_services/authentication.service";
import {UserService} from "../_services/user.service";

@Injectable()
export class SigninGuardBase implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthenticationService
        ) {
    }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        if (this.canActivateCore()) {
            return true;
        }
        this.redirectToLogin();
        return false;
    }

    canActivateCore(): boolean {
        return !!this.getAuthData();
    }

    getAuthData(): any {
        return this.authService.currentAuthData.getValue();
    }

    redirectToLogin() {
        this.router.navigate(['/auth']);
    }
}
