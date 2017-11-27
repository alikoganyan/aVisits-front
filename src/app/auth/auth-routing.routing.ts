import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { SigninPageComponent } from "./signin/signin.component";
import { SigninSelectChainComponent } from "./signin-select-chain/signin-select-chain.component";
import { SigninEnterPasswordComponent } from "./signin-enter-password/signin-enter-password.component";
import { SignupComponent } from "./signup/signup.component";
import { SigninResetPasswordComponent } from "./signin-reset-password/signin-reset-password.component";
import { SigninEnterPasswordGuard } from "./_guards/signin-enter-password.guard";
import { SigninGuardBase } from "./_guards/signin-guard-base";
import {SignupCompleteComponent} from "./signup-complete/signup-complete.component";
import {SigninSelectChainGuard} from "./_guards/signin-select-chain.guard";
import {SigninForgotPasswordComponent} from "./signin-forgot-password/signin-forgot-password.component";
import {SigninForgotPasswordGuard} from "./_guards/signin-forgot-password.guard";

const authRoutes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '',
                component: SigninPageComponent,
                data: { state: 'signin' }
            },
            {
                path: 'select-chain',
                component: SigninSelectChainComponent,
                canActivate: [SigninSelectChainGuard]
            },
            {
                path: 'password',
                component: SigninEnterPasswordComponent,
                canActivate: [SigninEnterPasswordGuard]
            },
            {
                path: 'signup',
                component: SignupComponent
            },
            {
                path: 'signup-complete',
                component: SignupCompleteComponent
            },
            {
                path: 'forgot-password',
                component: SigninForgotPasswordComponent,
                canActivate: [SigninForgotPasswordGuard]
            },
            {
                path: 'reset-password',
                component: SigninResetPasswordComponent,
                canActivate: [SigninGuardBase]
            },
            {
                path: 'reset-password/:token',
                component: SigninResetPasswordComponent
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}