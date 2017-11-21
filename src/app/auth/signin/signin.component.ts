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
            login: '',
            remember: false
        };
    }

    ngOnInit() {
    }

    onFormSubmit() {
        this.loading = true;

        this.authService.authenticationStepOne(this.model.login)
            .subscribe(
                res => this.onDataReceived(res),
                error => {
                    let errorText = error;
                    if (error.status === 404) {
                        errorText = 'Пользователь не найден';
                    }

                    this.showAlert();
                    this.alertService.error(errorText);
                    this.loading = false;
                }
            );
    }

    onDataReceived(res: any) {
        let chains = res.data.chains;

        if (chains.length > 1) {
            this.router.navigate(['select-chain'], {relativeTo: this.route});
        }
        else {
            this.authService.authenticationSelectChain(chains[0].id);
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
