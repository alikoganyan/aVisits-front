import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {SalonService} from "../salon.service";
import * as Collection from '../actions/collection';
import * as fromSalonsReducer from '../../theme/pages/default/reducers/salon';
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

    removeEntity(index: number): Observable<any> {
        return this.store.select(fromSalonsReducer.selectSalonEntities)
            .map(entities => {
                return entities[index]
            })
            .do(console.log)
            .map(salon => {
                debugger
                return this.salonService.delete(salon)
            })
            .catch(e => of(console.log(e)))
    }


    @Effect()
    loadSalons$ = this.loadEntitiesEffect$;

    @Effect()
    addSalon$ = this.addEntityEffect$;

    @Effect()
    updateSalon$ = this.updateEntityEffect$;

    @Effect()
    removeSalon$ = this.removeEntityEffect$;


    constructor(
        protected actions$: Actions,
        protected salonService: SalonService,
        protected collectionActions: SalonCollectionActions,
        private store: Store<fromSalons.State>
    ) {

        super(actions$, collectionActions);
    }
}