import {
    Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { UserService } from "../_services/user.service";
import { AlertService } from "../_services/alert.service";
import { AlertComponent } from "../_directives/alert.component";
import { Router } from "@angular/router";

@Component({
    templateUrl: './signup.component.html',
    styles: [
        '.m-login.m-login--1.m-login--singin .m-login__signup { display: block }'
    ],
    encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
    loading: boolean;
    model: any;

    @ViewChild('alertSignin', { read: ViewContainerRef }) alertSignin: ViewContainerRef;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private cfr: ComponentFactoryResolver
    ) {
        this.model = {
            companyName: '',
            userName: '',
            phone: '',
            email: '',
            password: '',
            passwordConfirm: ''
        }
    }

    signup() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
            data => {
                this.showAlert();
                this.alertService.success('Thank you. To complete your registration please check your email.', true);
                this.loading = false;
                //navigate to signin
                this.router.navigate(['/login']);
                // LoginCustom.displaySignInForm();
            },
            error => {
                this.showAlert();
                this.alertService.error(error);
                this.loading = false;
            });
    }

    showAlert() {
        this['alertSignin'].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this['alertSignin'].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

    ngOnInit() {
        let login = $('#m_login');
        (<any>login.find('.m-login__signup')).animateClass('flipInX animated');
    }

}
