import {
    Component, ComponentFactoryResolver, Inject, OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertComponent} from "../_directives/alert.component";
import {AlertService} from "../_services/alert.service";

@Component({
    templateUrl: './signin.component.html',
    styles: [
        '.chain-selector { width: 100% }'
    ],
    encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {
    loading: boolean;
    model: any = {};

    @ViewChild('alertSignin', {read: ViewContainerRef}) alertSignin: ViewContainerRef;

    constructor(/*private fb: FormBuilder,*/
                private router: Router,
                private route: ActivatedRoute,
                public authService: AuthenticationService,
                private alertService: AlertService,
                private cfr: ComponentFactoryResolver) {

        this.model = {
            phoneOrEmail: '',
            remember: false
        };
    }

    ngOnInit() {
    }

    onFormSubmit() {
        this.loading = true;

        let phone = '',
            email = '';
        if (this.model.phoneOrEmail.indexOf('@') > 0) {
            email = this.model.phoneOrEmail;
        }
        else {
            phone = this.model.phoneOrEmail;
        }

        this.authService.authenticationStepOne(email, phone)
            .subscribe(
                data => this.onDataReceived(data),
                error => {
                    this.showAlert();
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
    }

    onDataReceived(data: any) {
        if (!data.user) {
            this.showAlert();
            this.alertService.error("user not found");
            this.loading = false;

            return;
        }

        if (data.user.chains.length > 1) {
            this.router.navigate(['select-chain'], {relativeTo: this.route});
        }
        else {
            this.router.navigate(['password'], {relativeTo: this.route});
        }
    }

    showAlert() {
        this['alertSignin'].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this['alertSignin'].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

}
