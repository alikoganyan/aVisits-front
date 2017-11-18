import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ScriptLoaderService } from "../shared/_services/script-loader.service";
import { AuthenticationService } from "./_services/authentication.service";
import { AlertService } from "./_services/alert.service";
import { UserService } from "./_services/user.service";
import { AlertComponent } from "./_directives/alert.component";
import { LoginCustom } from "./_helpers/login-custom";
import { Helpers } from "../helpers";
import { routerTransition } from "./auth.router.animations";

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: 'auth.component.html',
    styleUrls: ['./auth.component.scss'],
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
        private cfr: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.model.remember = true;

        this._script.load('body', 'assets/vendors/base/vendors.bundle.js', 'assets/demo/default/base/scripts.bundle.js')
            .then(() => {
                Helpers.setLoading(false);
            });
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }

    onTransitionStart() {
        this.inTransition = false;

    }
    onTransitionDone() {
        this.inTransition = true;
    }

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
}