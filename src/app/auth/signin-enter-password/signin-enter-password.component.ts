import {
    Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service";
import { AlertService } from "../_services/alert.service";
import { AlertComponent } from "../_directives/alert.component";
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";

@Component({
    templateUrl: './signin-enter-password.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class SigninEnterPasswordComponent implements OnInit {
    loading: boolean;
    password: string = '';
    user: User;
    chainName: any = '';

    @ViewChild('alertSignin', { read: ViewContainerRef }) alertSignin: ViewContainerRef;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private authService: AuthenticationService,
                public userService: UserService,
                private alertService: AlertService,
                private cfr: ComponentFactoryResolver) {

        this.authService.currentAuthData.subscribe(
            authData => {
                this.user = authData.user;
                this.chainName = this.getChainName(authData);
            }
        );
    }

    getChainName(authData: any) {
        let chain;
        if(this.user.chains) {
            chain = this.user.chains.filter(c => c.id === authData.selectedChain)[0];
        }
        else {
            chain = authData.chain;
        }
        return (<any>chain).title;
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

    showAlert() {
        this['alertSignin'].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this['alertSignin'].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }


    ngOnInit() {
        $('.m-login__password').animateClass('flipInX animated');
    }

}
