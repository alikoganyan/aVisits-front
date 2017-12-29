import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {SalonService} from "../salon.service";
import * as Collection from '../actions/collection';
import * as fromSalonsReducer from '../../theme/pages/default/reducers';
import * as fromSalons from '../reducers/collection';
import "rxjs/add/operator/exhaustMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {of} from "rxjs/observable/of";
import {EntityCollectionEffects} from "../../entity-collection/entity-collection.effects";
import {Salon} from "../salon.model";
import {Observable} from "rxjs/Observable";
import {SalonCollectionActions} from "../actions/collection";
import {Store} from "@ngrx/store";

@Injectable()
export class SalonCollectionEffects extends EntityCollectionEffects<Salon> {
    fetchEntities(): Observable<any> {
        return this.salonService.getSalonsGeneralData();
    }

    addEntity(value: Salon): Observable<any> {
        return this.salonService.createSalon(value);
    }

    updateEntity(value: Salon): Observable<any> {
        return this.salonService.updateSalon(value);
    }

    removeEntity(value: Salon): Observable<any> {
        return this.salonService.delete(value);
    }

    fetchSingleEntity(args?: any): Observable<any> {
        return this.salonService.getSalonById(args);
    }


    @Effect()
    loadSalons$ = this.loadEntitiesEffect$;

    @Effect()
    addSalon$ = this.addEntityEffect$;

    @Effect()
    updateSalon$ = this.updateEntityEffect$;

    @Effect()
    removeSalon$ = this.removeEntityEffect$;

    @Effect()
    loadSingleSalon$ = this.loadSingleEntityEffect;


    constructor(
        protected actions$: Actions,
        protected salonService: SalonService,
        protected collectionActions: SalonCollectionActions,
        private store: Store<fromSalonsReducer.State>
    ) {

        super(actions$, collectionActions);
    }
}