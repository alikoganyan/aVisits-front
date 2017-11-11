import {
    Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service";
import { AlertService } from "../_services/alert.service";
import { AlertComponent } from "../_directives/alert.component";

@Component({
    templateUrl: './signin-enter-password.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class SigninEnterPasswordComponent implements OnInit {
    password: string = '';

    @ViewChild('alertSignin', { read: ViewContainerRef }) alertSignin: ViewContainerRef;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private authService: AuthenticationService,
        private alertService: AlertService,
        private cfr: ComponentFactoryResolver) {
    }

    signIn() {
        this.authService.login(this.password)
            .subscribe(
            res => {
                this.router.navigate(['/index']);
            },
            error => {
                this.showAlert();
                this.alertService.error(error);
                // this.loading = false;
            }
            );
    }

    resetPasswordClick() {
        this.router.navigate(['../reset-password'], { relativeTo: this.route });
    }

    showAlert() {
        this['alertSignin'].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this['alertSignin'].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }


    ngOnInit() {
        let login = $('#m_login');
        (<any>login.find('.m-login--enter-password')).animateClass('flipInX animated');
    }

}
