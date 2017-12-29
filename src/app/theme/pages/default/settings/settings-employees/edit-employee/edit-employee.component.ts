import {Component, OnInit} from '@angular/core';
import {EmployeeDialogBase} from "../employee-dialog-base/employee-dialog-base";
import {Employee} from "../../../../../../employee/employee.model";
import * as employeeActions from "../../../../../../employee/actions/collection";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../reducers";

@Component({
    selector: 'app-edit-employee',
    templateUrl: './edit-employee.component.html',
    styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent extends EmployeeDialogBase {
    protected createSaveAction(position: Employee) {
        return employeeActions.collectionActions.UpdateEntity(position);
    }

    constructor(protected store$: Store<fromRoot.State>,) {
        super(store$);
    }

}
