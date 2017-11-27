import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service";
import {UserService} from "../_services/user.service";
import * as fromAuth from '../reducers';
import * as Auth from '../actions/auth';
import {Store} from "@ngrx/store";

@Component({
    templateUrl: './signin-select-chain.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SigninSelectChainComponent implements OnInit {
    userChains$ = this.store.select(fromAuth.getAllUserChains);

    constructor(private store: Store<fromAuth.State>) {

        // this.userChains = this.authService.currentAuthData.getValue().chains;
    }

    selectUserChain(chainId: number) {
        this.store.dispatch(new Auth.SelectChain(chainId));
    }


    ngOnInit() {
        (<any>$('.m-login--choose-chain')).animateClass('flipInX animated');
    }

}
