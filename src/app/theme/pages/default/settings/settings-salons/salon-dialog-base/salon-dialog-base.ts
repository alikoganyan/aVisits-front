import * as fromRoot from '../../../reducers';
import * as fromSalonCollection from '../../../reducers/salon-collection';
import * as salonActions from '../../../../../../salon/actions/collection';
import {OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Salon} from "../../../../../../salon/salon.model";

export abstract class SalonDialogBase implements OnInit {
    salon$ = this.store.select(fromSalonCollection.selectCurrentSalon);
    error$ = this.store.select(fromSalonCollection.selectError);
    loading$ = this.store.select(fromSalonCollection.selectLoading);

    protected abstract createSaveAction(salon: Salon);

    constructor(protected store: Store<fromRoot.State>) {
    }

    ngOnInit() {
    }

    onSaveSalon(salon: Salon) {
        this.store.dispatch(this.createSaveAction(salon));
    }

    onDeleteSalon(salon: Salon) {
        this.store.dispatch(salonActions.collectionActions.RemoveEntity(salon));
    }
}