import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import * as Auth from '../actions/auth';
import * as fromAuth from '../reducers';
import {AuthenticationService} from "../_services/authentication.service";
import {of} from "rxjs/observable/of";
import {ActivatedRoute, Router} from "@angular/router";
import "rxjs/add/operator/exhaustMap";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {Store} from "@ngrx/store";
import "rxjs/add/operator/withLatestFrom";
import * as filterActions from "../../filter/actions/filter";

@Injectable()
export class AuthEffects {
    @Effect()
    submitCredentials$ = this.actions$
        .ofType(Auth.SUBMIT_CREDENTIALS)
        .map((action: Auth.SubmitCredentials) => action.payload)
        .exhaustMap(auth =>
            this.authService
                .authenticationStepOne(auth)
                .map(userChains => new Auth.SubmitCredentialsSuccess({ userChains }))
                .catch(err => of(new Auth.SubmitCredentialsFailure(err.json())))
        );

    @Effect()
    submitPassword$ = this.actions$
        .ofType(Auth.SUBMIT_PASSWORD)
        .map((action: Auth.SubmitPassword) => action.payload)
        .exhaustMap((data) =>
            this.authService
                .login(data)
                .map(resp => new Auth.LoginSuccess(resp))
                .catch(error => of(new Auth.LoginFailure(error.json())))
        );

    @Effect()
    submitCredentialsSuccess$ = this.actions$
        .ofType(Auth.SUBMIT_CREDENTIALS_SUCCESS)
        .withLatestFrom(
            this.store$.select(fromAuth.getTotalUserChains),
            this.store$.select(fromAuth.getUserChainIds),
        )
        .map(([_, userChainsCount, userChainIds]) => {
            if(userChainsCount > 1) {
                return new Auth.NavigateToSelectChain();
            }
            else {
                return new Auth.SelectChain(<number>userChainIds[0]);
            }
        });

    @Effect()
    loginSuccess$ = this.actions$
        .ofType(Auth.LOGIN_SUCCESS)
        .map(() => new Auth.IndexRedirect());


    /*
    Redirects
     */
    @Effect({ dispatch: false})
    NavigateToSeletChain$ = this.actions$
        .ofType(Auth.SELECT_CHAIN_REDIRECT)
        .do(() => this.router.navigate(['/auth/select-chain']));

    @Effect({ dispatch: false })
    loginRedirect$ = this.actions$
        .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
        .do(() => this.router.navigate(['/auth']));

    @Effect()
    selectChain$ = this.actions$
        .ofType(Auth.SELECT_CHAIN)
        .map((action: Auth.SelectChain) => action.payload)
        .map(chainId => new filterActions.SetFilterChainId(chainId))
        .do(() => this.router.navigate(['/auth/password']));

    @Effect({ dispatch: false })
    indexRedirect$ = this.actions$
        .ofType(Auth.INDEX_REDIRECT)
        .do(() => this.router.navigate(['/index']));


    constructor(
        private actions$: Actions,
        private store$: Store<fromAuth.State>,
        private authService: AuthenticationService,
        private router: Router
    ) {}
}