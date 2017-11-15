import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { UserService } from "../auth/_services/user.service";
import { Observable } from "rxjs/Observable";
import { User } from "../auth/_models/user";
import {AuthenticationService} from "../auth/_services/authentication.service";
import {BackendBaseService} from "./backend-base.service";

@Injectable()
export class BackendService extends BackendBaseService {
    private token: string;

    constructor(http: Http,
                public authService: AuthenticationService) {
        super(http);

        console.log("create backend service")

        this.authService.currentAuthData
            .subscribe(
            authData => {
                console.log(authData)
                this.token = authData.token;
            });
    }

    prepareUrl(url: string): string {
        return super.prepareUrl(url) + this.getTokenParameter();
    }

    getTokenParameter(): string {
        if (!this.token) return '';

        return `?token=${this.token}`;
    }

}
