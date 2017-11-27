import {
    Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { AuthenticationService } from "../_services/authentication.service";
import {UserService} from "../_services/user.service";
import {AlertService} from "../_services/alert.service";
import {AlertComponent} from "../_directives/alert.component";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";

@Component({
    templateUrl: './signin-reset-password.component.html'
})
export class SigninResetPasswordComponent implements OnInit {
    phone: string;
    email: string;
    authData: any;
    recoveryData: any = {
        token: '',
        type: '',
        phone: '',
        password: '',
        confirm_password: ''
    };
    recoveryCode: any;
    showRecoveryCode: boolean = true;


    @ViewChild('alertSignin', { read: ViewContainerRef }) alertSignin: ViewContainerRef;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private authService: AuthenticationService,
                private alertService: AlertService,
                private cfr: ComponentFactoryResolver) {

        this.route.params.subscribe(
            params => {
                this.recoveryCode = params;
                this.showRecoveryCode = false;
            }
        );

        // this.authData = this.authService.currentAuthData.getValue();
        // this.phone = this.authData.phone;
        // this.email = this.authData.email;
    }

    ngOnInit() {
        (<any>$('.m-login__reset-password')).animateClass('flipInX animated');
    }

    resetPassword(): void {
        this.showAlert();

        this.authService.resetPassword(this.recoveryData)
            .subscribe(
                res => {
                    this.showAlert();
                    this.alertService.success('Пароль успешно изменен');
                },
                error => {
                    this.showAlert();
                    this.alertService.error(error);
                }
            );
    }

    resendCode(): void {
        this.authService.requestRecoveryCode(this.authData.recoveryData)
            .subscribe(
                res => {
                    this.showAlert();
                    this.alertService.success('Новый пароль отправлен на вашу почту');
                }
            )
    }

    showAlert() {
        this['alertSignin'].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this['alertSignin'].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

}
