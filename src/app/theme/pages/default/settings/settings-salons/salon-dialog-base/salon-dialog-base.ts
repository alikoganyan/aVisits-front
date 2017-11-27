import * as fromRoot from '../../../reducers';
import * as fromSalon from '../../../reducers/salon';
import * as salonActions from '../../../../../../salon/actions/collection';
import {OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Salon} from "../../../../../../salon/salon.model";

export abstract class SalonDialogBase implements OnInit {
    salon$ = this.store.select(fromSalon.selectCurrentSalon);
    error$ = this.store.select(fromSalon.selectError);

    protected abstract createSaveAction(salon: Salon): salonActions.AddSalon | salonActions.UpdateSalon;

    constructor(protected store: Store<fromRoot.State>) {
    }

    ngOnInit() {
    }

    onSaveSalon(salon: Salon) {
        this.store.dispatch(this.createSaveAction(salon));
    }

    onDeleteSalon(salon: any) {
        this.store.dispatch(new salonActions.RemoveSalon(salon.id));
    }
}