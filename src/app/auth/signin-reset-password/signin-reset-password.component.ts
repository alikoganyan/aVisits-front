import {
    Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { AuthenticationService } from "../_services/authentication.service";
import {UserService} from "../_services/user.service";
import {AlertService} from "../_services/alert.service";
import {AlertComponent} from "../_directives/alert.component";

@Component({
    templateUrl: './signin-reset-password.component.html'
})
export class SigninResetPasswordComponent implements OnInit {
    phone: string;
    email: string;

    @ViewChild('alertSignin', { read: ViewContainerRef }) alertSignin: ViewContainerRef;

    constructor(
        private userService: UserService,
        private authService: AuthenticationService,
        private alertService: AlertService,
        private cfr: ComponentFactoryResolver) {

        let user = this.userService.currentUser.getValue();
        this.phone = user.phone;
        this.email = user.email;
    }

    ngOnInit() {
        $('.m-login__forgotten').animateClass('flipInX animated');
    }

    resetPassword(): void {
        this.showAlert();
        this.alertService.success('Новый пароль отправлен на вашу почту (TODO: phone)');

        // this.userService.forgotPassword(this.email)
        //     .subscribe(
        //         res => {
        //             this.showAlert();
        //             this.alertService.success('Новый пароль отправлен на вашу почту');
        //         },
        //         error => {
        //             this.showAlert();
        //             this.alertService.error(error);
        //         }
        //     );
    }

    showAlert() {
        this['alertSignin'].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this['alertSignin'].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

}
