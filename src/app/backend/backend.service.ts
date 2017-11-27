import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import {AuthenticationService} from "../auth/_services/authentication.service";
import {BackendBaseService} from "./backend-base.service";

@Injectable()
export class BackendService extends BackendBaseService {
    private token: string | null;

    constructor(http: Http,
                private authService: AuthenticationService) {

        super(http);

        this.authService.token$.subscribe(t => this.token = t);
    }

    prepareUrl(url: string): string {
        return super.prepareUrl(url) + this.getTokenParameter();
    }

    getTokenParameter(): string {
        if (!this.token) return '';

        return `?token=${this.token}`;
    }

}
