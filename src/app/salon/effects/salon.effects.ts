import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {SalonService} from "../salon.service";
import * as Salon from '../actions/salon';
import "rxjs/add/operator/exhaustMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {of} from "rxjs/observable/of";


@Injectable()
export class SalonEffects {
    @Effect()
    loadSalon$ = this.actions$
        .ofType(Salon.LOAD)
        .map((action: Salon.Load) => action.payload)
        .exhaustMap(salonId => this.salonService
            .getSalonById(salonId)
            .map(response => new Salon.LoadSuccess(response))
            .catch(error => of(new Salon.LoadFailure(error)))
        );


    constructor(
        private actions$: Actions,
        private salonService: SalonService) {}
}