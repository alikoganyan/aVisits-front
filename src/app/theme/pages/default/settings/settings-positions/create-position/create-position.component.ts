import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PositionDialogBase} from "../position-dialog-base/position-dialog-base.component";
import * as fromRoot from '../../../reducers';
import * as fromPosition from '../../../reducers/positions';
import * as positionActions from '../../../../../../position/actions/collection';
import {Store} from "@ngrx/store";
import {EmployeePosition} from "../../../../../../position/position.model";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-create-position',
    templateUrl: './create-position.component.html',
    styleUrls: ['./create-position.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePositionComponent extends PositionDialogBase {
    protected createSaveAction(position: EmployeePosition) {
        return positionActions.collectionActions.AddEntity(position);
    }


    constructor(protected store$: Store<fromRoot.State>,) {
        super(store$);
    }
}
