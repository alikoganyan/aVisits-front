import {
    Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { UserService } from "../_services/user.service";
import { AlertService } from "../_services/alert.service";
import { AlertComponent } from "../_directives/alert.component";
import {ActivatedRoute, Router} from "@angular/router";
import * as fromAuth from '../reducers';
import * as Auth from '../actions/signup';
import {Store} from "@ngrx/store";


@Component({
    templateUrl: './signup.component.html',
    styles: [
        '.m-login.m-login--1.m-login--singin .m-login__signup { display: block }'
    ],
    encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
    error$ = this.store.select(fromAuth.getError);

    constructor(private store: Store<fromAuth.State>) {
    }

    onSubmit($event) {
        this.store.dispatch(new Auth.SubmitRegisterInfo($event));
    }

    ngOnInit() {
        let login = $('#m_login');
        (<any>login.find('.m-login__signup')).animateClass('flipInX animated');
    }

}
