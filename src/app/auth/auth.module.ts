import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BaseRequestOptions, HttpModule } from "@angular/http";
import { MockBackend } from "@angular/http/testing";

import { AuthRoutingModule } from "./auth-routing.routing";
import { AuthComponent } from "./auth.component";
import { AlertComponent } from "./_directives/alert.component";
import { LogoutComponent } from "./logout/logout.component";
import { AuthGuard } from "./_guards/auth.guard";
import { AlertService } from "./_services/alert.service";
import { AuthenticationService } from "./_services/authentication.service";
import { UserService } from "./_services/user.service";
import { fakeBackendProvider } from "./_helpers/index";
import { SigninSelectChainComponent } from './signin-select-chain/signin-select-chain.component';
import { SigninEnterPasswordComponent } from './signin-enter-password/signin-enter-password.component';
import { SigninResetPasswordComponent } from './signin-reset-password/signin-reset-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { Routes } from "@angular/router";
import { SigninEnterPasswordGuard } from "./_guards/signin-enter-password.guard";
import { SigninGuardBase } from "./_guards/signin-guard-base";


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
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        AuthRoutingModule,
    ],
    providers: [
        AuthGuard,
        SigninGuardBase,
        SigninEnterPasswordGuard,
        AlertService,
        AuthenticationService,
        // api backend simulation
        // fakeBackendProvider,
        // MockBackend,
        BaseRequestOptions,
    ],
    entryComponents: [AlertComponent]
})

export class AuthModule {
}