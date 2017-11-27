import * as Signup from '../actions/signup';
import * as fromSignup from '../reducers';
import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Router} from "@angular/router";
import {AuthenticationService} from "../_services/authentication.service";
import {of} from "rxjs/observable/of";
import "rxjs/add/operator/exhaustMap";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

@Injectable()
export class SignupEffects {
    @Effect()
    submitRegisterInfo$ = this.actions$
        .ofType(Signup.SUBMIT_REGISTER_INFO)
        .map((action: Signup.SubmitRegisterInfo) => action.payload)
        .exhaustMap(regInfo =>
            this.authService
                .signup(regInfo)
                .map(response => new Signup.SubmitRegisterInfoSuccess(response))
                .catch(error => of(new Signup.SubmitRegisterInfoFailure(error.json())))
        );

    @Effect({ dispatch: false })
    submitRegisterInfoSuccess$ = this.actions$
        .ofType(Signup.SUBMIT_REGISTER_SUCCESS)
        .do(() => this.router.navigate(['/auth/signup-complete']));

    constructor(
        private actions$: Actions,
        private router: Router,
        private authService: AuthenticationService
    ) {}

}