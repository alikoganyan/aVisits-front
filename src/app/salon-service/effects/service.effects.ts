import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import * as Service from '../actions/service';
import "rxjs/add/operator/exhaustMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {of} from "rxjs/observable/of";
import {SalonService_Service} from "../salon-service.service";

@Injectable()
export class SalonServiceEffects {
    @Effect()
    setNewPrices$ = this.actions$
        .ofType(Service.SET_NEW_PRICES)
        .map((action: Service.SetNewPrices) => action.payload)
        .exhaustMap(newPrices => this.salonServiceService
            .setNewPrices(newPrices)
            .map(response => new Service.SetNewPricesSuccess(response))
            .catch(error => of(new Service.SetNewPricesFailure(error)))
        );

        constructor(
            private actions$: Actions,
            private salonServiceService: SalonService_Service) {}
}