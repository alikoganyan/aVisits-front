import {
    Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertComponent} from "../_directives/alert.component";
import {AlertService} from "../_services/alert.service";

let NotificationType = {
    Email: '1',
    Phone: '2'
}

@Component({
    selector: 'app-signin-forgot-password',
    templateUrl: './signin-forgot-password.component.html',
    styleUrls: ['./signin-forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SigninForgotPasswordComponent implements OnInit {
    phone: string;
    email: string;
    recoveryData = {
        type: '',
        phone: '',
        email: ''
    };

    @ViewChild('alertSignin', {read: ViewContainerRef}) alertSignin: ViewContainerRef;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private authService: AuthenticationService,
                private cfr: ComponentFactoryResolver,
                private alertService: AlertService) {

        let credentials = this.authService.currentAuthData.getValue().credentials;
        this.recoveryData.phone = credentials.phone;
        this.recoveryData.email = credentials.email;
    }

    ngOnInit() {
        $('.m-login__forgotten').animateClass('flipInX animated');
    }

    setNotificationType(type: any): void {
        this.recoveryData.type = NotificationType[type];
    }

    sendCode(): void {
        this.authService.requestRecoveryCode(this.recoveryData)
            .subscribe(
                res => {
                    if(this.recoveryData.type === NotificationType.Email) {
                        this.showAlert();
                        this.alertService.error('Инструкция по восстановлению доступа отправлена на ваш email');
                    }
                    else {
                        this.router.navigate(['../reset-password'], {relativeTo: this.route})
                    }
                },
                error => {
                }
            );
    }

    showAlert() {
        this['alertSignin'].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this['alertSignin'].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
}
