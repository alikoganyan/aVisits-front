import * as fromRoot from '../../../reducers';
import * as salonActions from '../../../../../../salon/actions/collection';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Salon } from "../../../../../../salon/salon.model";
import { Router } from "@angular/router";
import { SalonService } from "../../../../../../salon/salon.service";
import { UserService } from "../../../../../../auth/_services/user.service";
import { AuthenticationService } from "../../../../../../auth/_services/authentication.service";
import {User} from "../../../../../../auth/_models/user";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SalonDialogBase} from "../salon-dialog-base/salon-dialog-base";
import {Store} from "@ngrx/store";

@Component({
    selector: 'app-create-salon',
    templateUrl: './create-salon.component.html',
    styleUrls: ['./create-salon.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateSalonComponent extends SalonDialogBase {

    protected createSaveAction(salon: Salon) {
        return salonActions.collectionActions.AddEntity(salon);
    }

    constructor(protected store: Store<fromRoot.State>) {
        super(store);
    }

}
