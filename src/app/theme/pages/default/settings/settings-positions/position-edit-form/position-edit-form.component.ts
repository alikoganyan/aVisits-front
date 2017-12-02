import {Component, OnInit} from '@angular/core';
import {EditFormBase} from "../../edit-form-base";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as fromRoot from '../../../reducers';
import * as fromPosition from '../../../reducers/positions';
import * as positionActions from '../../../../../../position/actions/collection';
import {Store} from "@ngrx/store";
import {EmployeePosition} from "../../../../../../position/position.model";


@Component({
    selector: 'app-position-edit-form',
    templateUrl: './position-edit-form.component.html',
    styleUrls: ['./position-edit-form.component.scss']
})
export class PositionEditFormComponent extends EditFormBase<EmployeePosition> {
    protected get createTitle() { return 'Новая должность'; }

    protected get editTitle() { return 'Обоновить должность'; }

    constructor(public activeModal: NgbActiveModal,
                private store: Store<fromRoot.State>) {
        super();
    }

    onClose() {
        // TODO: check for changes in form
        this.activeModal.close();
        this.store.dispatch(positionActions.collectionActions.FinishOperation());
    }

}
