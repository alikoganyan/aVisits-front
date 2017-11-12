import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";

@Component({
    templateUrl: './signin-reset-password.component.html',
    styles: [
        '.m-login.m-login--1.m-login--singin .m-login__forget-password { display: block }'
    ],
    encapsulation: ViewEncapsulation.None
})
export class SigninResetPasswordComponent implements OnInit {
    phone: string;
    email: string;

    constructor(
        public authService: AuthenticationService) {

        let user = this.authService.stepsData.user;
        this.phone = user.phone;
        this.email = user.email;
    }

    ngOnInit() {
        let login = $('#m_login');
        (<any>login.find('.m-login__forget-password')).animateClass('flipInX animated');
    }

}
