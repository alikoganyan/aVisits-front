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
    userChains: any;
    selectedUserChain: any;
    userEmail: string;

    @ViewChild('alertSignin', {read: ViewContainerRef}) alertSignin: ViewContainerRef;
    @ViewChild('alertSignup', {read: ViewContainerRef}) alertSignup: ViewContainerRef;
    @ViewChild('alertForgotPass', {read: ViewContainerRef}) alertForgotPass: ViewContainerRef;
    @ViewChild('alertEnter', {read: ViewContainerRef}) alertEnter: ViewContainerRef;


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
        this._script.load('body', 'assets/vendors/base/vendors.bundle.js', 'assets/demo/default/base/scripts.bundle.js')
            .then(() => {
                Helpers.setLoading(false);
                LoginCustom.init();
            });
    }

    signin() {
        function validateEmail(email) {
            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        let body = {};
        validateEmail(this.model.emailOrPhone) ? body['email'] = this.model.emailOrPhone : body['phone'] = this.model.emailOrPhone;

        this.loading = true;
        this._authService.login(body)
            .subscribe(
                response => {
                    this.loading = false;
                    if (response.status == 'OK') {
                        this.selectedUserChain = response.data.user.chains[0];
                        this.userChains = response.data.user.chains;
                        this.userEmail = response.data.user.email;
                        response.data.user.chains.length > 1 ? LoginCustom.displayEmployeeNext() : LoginCustom.displayPasswordFormNext();
                    } else {
                        this.showAlert('alertSignin');
                        this._alertService.error('Пользователь не найден');
                    }
                },
                error => {
                    console.log(error);
                    this.showAlert('alertSignin');
                    this._alertService.error('Пользователь не найден');
                    this.loading = false;
                });
    }

    selectUserChain(userChain) {
        this.selectedUserChain = userChain;
        LoginCustom.displayPasswordFormNext();
    }

    enter() {
        this.loading = true;
        console.log(this.selectedUserChain);
        this._authService.enter(this.userEmail, this.model.password, this.selectedUserChain.id)
            .subscribe(
                (data) => {
                    this._getCityService.chain.next(data);
                    if (data.redirect_to_create_salon == 1) {
                        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/create-new-salon';
                    } else {
                        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
                    }
                    this._router.navigate([this.returnUrl]);
                },
                error => {
                    console.log(error);
                    this.showAlert('alertEnter');
                    this._alertService.error('Неправильный пароль');
                    this.loading = false;
                }
            );
    }

    signup() {
        this.loading = true;
        this._userService.create(this.model)
            .subscribe(
                data => {
                    this.showAlert('alertSignin');
                    this._alertService.success('Спасибо. Чтобы завершить регистрацию, проверьте свою электронную почту.', true);
                    this.loading = false;
                    // LoginCustom.displaySignInForm();
                    this.model = {};
                    console.log(data.status);
                    console.log(data);
                    if (data.status == "OK") {
                        this._router.navigate([this._route.snapshot.queryParams['returnUrl'] || '/create-new-salon']);
                    }
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