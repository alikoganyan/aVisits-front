import {
    Component, ComponentFactoryResolver, Inject, OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertComponent} from "../_directives/alert.component";
import {AlertService} from "../_services/alert.service";
import {Store} from "@ngrx/store";
import * as fromAuth from '../reducers';
import * as Auth from '../actions/auth';

@Component({
    templateUrl: './signin.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SigninPageComponent implements OnInit {
    error$ = this.store.select(fromAuth.getError);

    constructor(private store: Store<fromAuth.State>) {
    }

    ngOnInit() {
    }

    onSubmit($event) {
        this.store.dispatch(new Auth.SubmitCredentials($event));
    }

}
