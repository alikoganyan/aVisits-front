import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { Observable } from "rxjs/Rx";
import {AuthenticationService} from "../_services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private authService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let authData = JSON.parse(localStorage.getItem('authData'));
        if (authData)
            return true;

        this._router.navigate(['/auth']);
    }
}