import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PositionDialogBase} from "../position-dialog-base/position-dialog-base.component";
import {EmployeePosition} from "../../../../../../position/position.model";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../../reducers';
import * as fromPosition from '../../../reducers/positions';
import * as positionActions from '../../../../../../position/actions/collection';
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-edit-position',
    templateUrl: './edit-position.component.html',
    styleUrls: ['./edit-position.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPositionComponent extends PositionDialogBase {
    protected createSaveAction(position: EmployeePosition) {
        return positionActions.collectionActions.UpdateEntity(position);
    }

    constructor(protected store$: Store<fromRoot.State>,) {
        super(store$);
    }

}
