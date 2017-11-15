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
import { SigninSelectChainComponent } from './signin-select-chain/signin-select-chain.component';
import { SigninEnterPasswordComponent } from './signin-enter-password/signin-enter-password.component';
import { SigninResetPasswordComponent } from './signin-reset-password/signin-reset-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SigninEnterPasswordGuard } from "./_guards/signin-enter-password.guard";
import { SigninGuardBase } from "./_guards/signin-guard-base";
import { SignupCompleteComponent } from './signup-complete/signup-complete.component';
import {SigninSelectChainGuard} from "./_guards/signin-select-chain.guard";


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
        SigninSelectChainGuard,
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