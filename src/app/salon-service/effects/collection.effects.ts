import {EntityCollectionEffects} from "../../entity-collection/entity-collection.effects";
import {SalonServiceModel} from "../salon-service.model";
import {Observable} from "rxjs/Observable";
import {Actions, Effect} from "@ngrx/effects";
import {SalonServiceCollectionActions} from "../actions/collection";
import {Store} from "@ngrx/store";
import {SalonService_Service} from "../salon-service.service";
import * as fromRoot from '../../theme/pages/default/reducers'

export class SalonServiceCollectionEffects extends EntityCollectionEffects<SalonServiceModel> {
    fetchEntities(args?: any): Observable<any> {
        return this.salonServicesService.get(args);
    }

    addEntity(value: SalonServiceModel): Observable<any> {
        return this.salonServicesService.create(value);
    }

    updateEntity(value: SalonServiceModel): Observable<any> {
        return this.salonServicesService.update(value);
    }

    removeEntity(value: SalonServiceModel): Observable<any> {
        return this.salonServicesService.delete(value);
    }


    @Effect()
    loadSalonServices$ = this.loadEntitiesEffect$;

    @Effect()
    addSalonService$ = this.addEntityEffect$;

    @Effect()
    updateSalonService$ = this.updateEntityEffect$;

    @Effect()
    removeSalonService$ = this.removeEntityEffect$;


    constructor(
        protected actions$: Actions,
        protected salonServicesService: SalonService_Service,
        protected collectionActions: SalonServiceCollectionActions,
        private store: Store<fromRoot.State>
    ) {

        super(actions$, collectionActions);
    }
}