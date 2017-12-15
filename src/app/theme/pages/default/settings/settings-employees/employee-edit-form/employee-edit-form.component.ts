import {Component, OnInit} from '@angular/core';
import {EditFormBase} from "../../edit-form-base";
import {Employee} from "../../../../../../employee/employee.model";
import {Store} from "@ngrx/store";
import * as employeeActions from "../../../../../../employee/actions/collection";
import * as fromRoot from "../../../reducers";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-employee-edit-form',
    templateUrl: './employee-edit-form.component.html',
    styleUrls: ['./employee-edit-form.component.scss']
})
export class EmployeeEditFormComponent extends EditFormBase<Employee> {
    protected get createTitle() { 'Добавление сотрудника'; }
    protected get editTitle() { return 'Редактирование сотрудника';}

    constructor(public activeModal: NgbActiveModal,
                private store: Store<fromRoot.State>) {
        super();
    }

    onClose() {
        // TODO: check for changes in form
        this.activeModal.close();
        this.store.dispatch(employeeActions.collectionActions.FinishOperation());
    }

}
