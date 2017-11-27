import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {SalonService} from "../salon.service";
import * as Collection from '../actions/collection';
import "rxjs/add/operator/exhaustMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {of} from "rxjs/observable/of";

@Injectable()
export class SalonCollectionEffects {
    @Effect()
    loadSalons$ = this.actions$
        .ofType(Collection.LOAD_ALL)
        .exhaustMap(() =>
            this.salonService
                .getSalonsGeneralData()
                .map(response => new Collection.LoadAllSuccess(response))
                .catch(error => of(new Collection.LoadAllFailure(error)))
        );


    @Effect()
    addSalon$ = this.actions$
        .ofType(Collection.ADD_SALON)
        .map((action: Collection.AddSalon) => action.payload)
        .exhaustMap(salon =>
            this.salonService
                .createSalon(salon)
                .map(response => new Collection.AddSalonSuccess(response))
                .catch(error =>of(new Collection.AddSalonFailure(error.json())))
        );

    @Effect()
    updateSalon$ = this.actions$
        .ofType(Collection.UPDATE_SALON)
        .map((action: Collection.UpdateSalon) => action.payload)
        .exhaustMap(salon =>
            this.salonService
                .updateSalon(salon)
                .map(response => new Collection.UpdateSalonSuccess(response))
                .catch(error =>of(new Collection.UpdateSalonFailure(error.json())))
        );


    constructor(
        private actions$: Actions,
        private salonService: SalonService) {}
}