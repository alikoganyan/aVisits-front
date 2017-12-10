import {Component, OnInit} from '@angular/core';
import {SalonServiceDialogBaseComponent} from "../salon-service-dialog-base/salon-service-dialog-base.component";
import {Action, Store} from "@ngrx/store";
import * as fromRoot from "../../../../reducers";
import {SalonServiceModel} from "../../../../../../../salon-service/salon-service.model";
import * as serviceActions from "../../../../../../../salon-service/actions/collection";

@Component({
    selector: 'app-create-salon-service',
    templateUrl: './create-salon-service.component.html',
    styleUrls: ['./create-salon-service.component.scss']
})
export class CreateSalonServiceComponent extends SalonServiceDialogBaseComponent{
    protected createSaveAction(service: SalonServiceModel): Action {
        return serviceActions.collectionActions.AddEntity(service);
    }

    constructor(protected store$: Store<fromRoot.State>) {
        super(store$);
    }


}
