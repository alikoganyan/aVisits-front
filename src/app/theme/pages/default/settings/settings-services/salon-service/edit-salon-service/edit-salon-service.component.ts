import {Component, OnInit} from '@angular/core';
import {SalonServiceDialogBaseComponent} from "../salon-service-dialog-base/salon-service-dialog-base.component";
import {Action, Store} from "@ngrx/store";
import {SalonServiceModel} from "../../../../../../../salon-service/salon-service.model";
import * as serviceActions from "../../../../../../../salon-service/actions/collection";
import * as fromRoot from "../../../../reducers";

@Component({
    selector: 'app-edit-salon-service',
    templateUrl: './edit-salon-service.component.html',
    styleUrls: ['./edit-salon-service.component.scss']
})
export class EditSalonServiceComponent extends SalonServiceDialogBaseComponent {
    protected createSaveAction(service: SalonServiceModel): Action {
        return serviceActions.collectionActions.UpdateEntity(service);
    }

    constructor(protected store$: Store<fromRoot.State>) {
        super(store$);
    }
}
