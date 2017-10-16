import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CreateSalonGuardService implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let currentSalon = JSON.parse(localStorage.getItem('currentSalon'));
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentSalon !== null || currentUser.redirect_to_create_salon == 0) {
            // logged in so return true
            return true;
        }
        else {
            this.router.navigate(['/create-new-salon'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}

