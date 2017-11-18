import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {BaseRequestOptions, Http, HttpModule, RequestOptions} from "@angular/http";
import { MockBackend } from "@angular/http/testing";

import { AuthRoutingModule } from "./auth-routing.routing";
import { AuthComponent } from "./auth.component";
import { AlertComponent } from "./_directives/alert.component";
import { LogoutComponent } from "./logout/logout.component";
import { AuthGuard } from "./_guards/auth.guard";
import { AlertService } from "./_services/alert.service";
import { AuthenticationService } from "./_services/authentication.service";
import { SigninSelectChainComponent } from './signin-select-chain/signin-select-chain.component';
import { SigninEnterPasswordComponent } from './signin-enter-password/signin-enter-password.component';
import { SigninResetPasswordComponent } from './signin-reset-password/signin-reset-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SigninEnterPasswordGuard } from "./_guards/signin-enter-password.guard";
import { SigninGuardBase } from "./_guards/signin-guard-base";
import { SignupCompleteComponent } from './signup-complete/signup-complete.component';
import {SigninSelectChainGuard} from "./_guards/signin-select-chain.guard";
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { SigninForgotPasswordComponent } from './signin-forgot-password/signin-forgot-password.component';
import { SigninPasswordChangedComponent } from './signin-password-changed/signin-password-changed.component';
import {SigninForgotPasswordGuard} from "./_guards/signin-forgot-password.guard";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
    declarations: [
        AuthComponent,
        AlertComponent,
        LogoutComponent,
        SigninSelectChainComponent,
        SigninEnterPasswordComponent,
        SigninResetPasswordComponent,
        SigninComponent,
        SignupComponent,
        SignupCompleteComponent,
        SigninForgotPasswordComponent,
        SigninPasswordChangedComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        AuthRoutingModule,
    ],
    providers: [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        AuthGuard,
        SigninGuardBase,
        SigninEnterPasswordGuard,
        SigninSelectChainGuard,
        SigninForgotPasswordGuard,
        AlertService,
        // api backend simulation
        // fakeBackendProvider,
        // MockBackend,
        BaseRequestOptions,
    ],
    entryComponents: [AlertComponent]
})

export class AuthModule {
}