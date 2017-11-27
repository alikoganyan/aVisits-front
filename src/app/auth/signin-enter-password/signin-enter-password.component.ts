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
import * as fromAuth from '../reducers';
import * as Auth from '../actions/auth';
import {Store} from "@ngrx/store";

@Component({
    templateUrl: './signin-enter-password.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class SigninEnterPasswordComponent implements OnInit {
    selectedChain$ = this.store.select(fromAuth.getSelectedChain);
    error$ = this.store.select(fromAuth.getError);


    constructor(private store: Store<fromAuth.State>) {

    }


    signIn(password) {
        this.store.dispatch(new Auth.SubmitPassword(password));
    }


    ngOnInit() {
        (<any>$('.m-login__password')).animateClass('flipInX animated');
    }

}
