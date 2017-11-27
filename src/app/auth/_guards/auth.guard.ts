import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import {AuthenticationService} from "../_services/authentication.service";
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    private token;
    private jwtHelper = new JwtHelper();

    constructor(private _router: Router, private authService: AuthenticationService) {
        this.authService.token$.subscribe(t => this.token = t);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if(!this.jwtHelper.isTokenExpired(this.token)) {
            return true;
        }

        this._router.navigate(['/auth']);
    }


}