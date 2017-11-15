import {
    Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { UserService } from "../_services/user.service";
import { AlertService } from "../_services/alert.service";
import { AlertComponent } from "../_directives/alert.component";
import {ActivatedRoute, Router} from "@angular/router";

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

    @ViewChild('alertSignup', { read: ViewContainerRef }) alertSignup: ViewContainerRef;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService,
        private cfr: ComponentFactoryResolver
    ) {
        this.model = {
            name: '',
            phone: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    }

    signup() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
            data => {
                this.loading = false;
                //navigate to signin
                this.router.navigate(['../signup-complete'], { relativeTo: this.route });
            },
            error => {
                this.showAlert();
                this.alertService.error(error);
                this.loading = false;
            });
    }

    showAlert() {
        this['alertSignup'].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this['alertSignup'].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

    ngOnInit() {
        let login = $('#m_login');
        (<any>login.find('.m-login__signup')).animateClass('flipInX animated');
    }

}
