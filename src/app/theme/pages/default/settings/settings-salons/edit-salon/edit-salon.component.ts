import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { Salon } from "../../../../../../salon/salon.model";
import { SalonService } from "../../../../../../salon/salon.service";
import { ActivatedRoute, Router } from "@angular/router";
import "rxjs/add/operator/do";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../../reducers';
import * as salonActions from '../../../../../../salon/actions/collection';
import {SalonDialogBase} from "../salon-dialog-base/salon-dialog-base";

@Component({
    selector: 'app-edit-salon',
    templateUrl: './edit-salon.component.html',
    styleUrls: ['./edit-salon.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EditSalonComponent extends SalonDialogBase {

    protected createSaveAction(salon: Salon) {
        return salonActions.collectionActions.UpdateEntity(salon);
    }

    constructor(protected store: Store<fromRoot.State>) {
        super(store);
    }


}
