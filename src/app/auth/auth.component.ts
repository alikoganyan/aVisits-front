import {
    Component,
    ComponentFactoryResolver,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ScriptLoaderService} from "../_services/script-loader.service";
import {AuthenticationService} from "./_services/authentication.service";
import {AlertService} from "./_services/alert.service";
import {UserService} from "./_services/user.service";
import {AlertComponent} from "./_directives/alert.component";
import {LoginCustom} from "./_helpers/login-custom";
import {Helpers} from "../helpers";
import {GetCityService} from "../_services/get-city.service";


@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: './templates/login-1.component.html',
    encapsulation: ViewEncapsulation.None
})

export class AuthComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;


    @ViewChild('alertSignin', {read: ViewContainerRef}) alertSignin: ViewContainerRef;
    @ViewChild('alertSignup', {read: ViewContainerRef}) alertSignup: ViewContainerRef;
    @ViewChild('alertForgotPass', {read: ViewContainerRef}) alertForgotPass: ViewContainerRef;


    constructor(private _router: Router,
                private _script: ScriptLoaderService,
                private _userService: UserService,
                private _route: ActivatedRoute,
                private _authService: AuthenticationService,
                private _alertService: AlertService,
                private cfr: ComponentFactoryResolver,
                private _getCityService: GetCityService) {
    }

    ngOnInit() {
        this.model.remember = true;
        // get return url from route parameters or default to '/'
        // this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        // this._router.navigate([this.returnUrl]);

        this._script.load('body', 'assets/vendors/base/vendors.bundle.js', 'assets/demo/default/base/scripts.bundle.js')
            .then(() => {
                Helpers.setLoading(false);
                LoginCustom.init();
            });
    }

    signin() {
        /*function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        var body = {};
            if (validateEmail(this.model.emailOrPhone)) {

                body['email'] = this.model.emailOrPhone;
               console.log(this.model.emailOrPhone + " is email");
            } else {
                body['phone'] = this.model.emailOrPhone;
                console.log(this.model.emailOrPhone + " is phone number");
            }*/

        this.loading = true;
        this._authService.login(this.model.emailOrPhone, this.model.password)
            .subscribe(
                data => {
                    this._getCityService.chain.next(data);
                    if (data.redirect_to_create_salon == 1) {
                        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/create_salon';
                    } else if (data.redirect_to_create_salon == 0) {
                        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
                    }
                    this._router.navigate([this.returnUrl]);
                },
                error => {
                    console.log(error);
                    this.showAlert('alertSignin');
                    this._alertService.error('Пользователь не найден');
                    this.loading = false;
                });
    }

    signup() {
        this.loading = true;
        this._userService.create(this.model)
            .subscribe(
                data => {
                    this.showAlert('alertSignin');
                    this._alertService.success('Thank you. To complete your registration please check your email.', true);
                    this.loading = false;
                    LoginCustom.displaySignInForm();
                    this.model = {};
                },
                error => {
                    this.showAlert('alertSignup');
                    this._alertService.error('Форма заполнена не неправильно');
                    this.loading = false;
                });
    }

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