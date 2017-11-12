import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ScriptLoaderService } from "../shared/_services/script-loader.service";
import { AuthenticationService } from "./_services/authentication.service";
import { AlertService } from "./_services/alert.service";
import { UserService } from "./_services/user.service";
import { AlertComponent } from "./_directives/alert.component";
import { LoginCustom } from "./_helpers/login-custom";
import { Helpers } from "../helpers";
import {routerTransition} from "./auth.router.animations";

@Component({
    // selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: 'auth.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [
        routerTransition
    ]
})

export class AuthComponent implements OnInit {
    model: any = {};
    loading = false;
    inTransition = false;
    returnUrl: string;

    @ViewChild('alertSignin', { read: ViewContainerRef }) alertSignin: ViewContainerRef;
    @ViewChild('alertSignup', { read: ViewContainerRef }) alertSignup: ViewContainerRef;
    @ViewChild('alertForgotPass', { read: ViewContainerRef }) alertForgotPass: ViewContainerRef;

    constructor(private _router: Router,
        private _script: ScriptLoaderService,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private cfr: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.model.remember = true;
        // get return url from route parameters or default to '/'
        // this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        // this._router.navigate([this.returnUrl]);

        this._script.load('body', 'assets/vendors/base/vendors.bundle.js', 'assets/demo/default/base/scripts.bundle.js')
            .then(() => {
                Helpers.setLoading(false);
                // LoginCustom.init();
            });
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }

    onTransitionStart() {
        this.inTransition = false;
        console.log("start")

    }
    onTransitionDone() {
        // $('#m_login');
        this.inTransition = true;
        console.log("end")
    }

    // signin() {
    //     this.loading = true;
    //     this._authService.login(this.model.email, this.model.password)
    //         .subscribe(
    //         data => {
    //             this._router.navigate([this.returnUrl]);
    //         },
    //         error => {
    //             this.showAlert('alertSignin');
    //             this._alertService.error(error);
    //             this.loading = false;
    //         });
    // }



    forgotPass() {
        this.loading = true;
        this._userService.forgotPassword(this.model.email)
            .subscribe(
            data => {
                this.showAlert('alertSignin');
                this._alertService.success('Cool! Password recovery instruction has been sent to your email.', true);
                this.loading = false;
                LoginCustom.displaySignInForm();
                this.model = {};
            },
            error => {
                this.showAlert('alertForgotPass');
                this._alertService.error(error);
                this.loading = false;
            });
    }

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
}