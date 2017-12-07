import * as fromRoot from '../../../reducers';
import * as fromSalon from '../../../reducers/salon';
import * as salonActions from '../../../../../../salon/actions/collection';
import {OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Salon} from "../../../../../../salon/salon.model";

export abstract class SalonDialogBase implements OnInit {
    salon$ = this.store.select(fromSalon.selectCurrentSalon);
    error$ = this.store.select(fromSalon.selectError);
    loading$ = this.store.select(fromSalon.selectLoading);

    protected abstract createSaveAction(salon: Salon);

    constructor(protected store: Store<fromRoot.State>) {
    }

    ngOnInit() {
    }

    onSaveSalon(salon: Salon) {
        salon.img = '';
        this.store.dispatch(this.createSaveAction(salon));
    }

    onDeleteSalon(salon: Salon) {
        this.store.dispatch(salonActions.collectionActions.RemoveEntity(salon.id));
    }
}