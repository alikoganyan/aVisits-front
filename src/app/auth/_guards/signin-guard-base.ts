import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from "../_services/authentication.service";

@Injectable()
export class SigninGuardBase implements CanActivate {
    constructor(private router: Router,
                public authService: AuthenticationService) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {

        if(this.canActivateCore()) {
            return true;
        }
        this.redirectToLogin();
        return false;
    }

    canActivateCore(): boolean {
        return !!this.getUser();
    }

    getUser(): any {
        if(this.authService.stepsData) {
            return this.authService.stepsData.user;
        }
        return null;
    }

    redirectToLogin() {
        this.router.navigate(['/login']);
    }
}
