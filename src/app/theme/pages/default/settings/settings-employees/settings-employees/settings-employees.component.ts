import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SettingsMasterViewComponent} from "../../settings-page-base/settings-master-view-component";
import {Employee} from "../../../../../../employee/employee.model";
import {MemoizedSelector, Store} from "@ngrx/store";
import {EntityCollectionActions} from "../../../../../../entity-collection/entity-collection.actions";
import {UniqueEntity} from "../../../../../../entity-collection/unique-entity";
import * as fromRoot from "../../../reducers";
import * as fromEmployees from "../../../reducers/employee";
import * as employeeActions from '../../../../../../employee/actions/collection';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalService} from "../../../../../../shared/modal.service";
import {CreateEmployeeComponent} from "../create-employee/create-employee.component";
import {EditEmployeeComponent} from "../edit-employee/edit-employee.component";

@Component({
    selector: 'app-settings-employees',
    templateUrl: './settings-employees.component.html',
    styleUrls: ['./settings-employees.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsEmployeesComponent extends SettingsMasterViewComponent<Employee>{
    protected get entitiesSelector(): MemoizedSelector<Object, any> {
        return fromEmployees.selectEmployeesBySalon;
    }

    protected createEntityInstance(): Employee {
        return new Employee({
            chain_id: this.filterChainId
        });
    }

    protected get entityCollectionActions(): EntityCollectionActions<Employee> {
        return employeeActions.collectionActions;
    }

    protected createEntityComponent() {
        return CreateEmployeeComponent;
    }

    protected editEntityComponent() {
        return EditEmployeeComponent;
    }

    protected get operationCompleteSelector(): MemoizedSelector<Object, boolean> {
        return fromEmployees.selectOperationSuccessful;
    }

    getModalSize(entity?: UniqueEntity): string {
        return 'lg';
    }

    constructor(protected store$: Store<fromRoot.State>,
                protected modalService: ModalService,
                protected activeModal: NgbActiveModal,) {
        super(store$, modalService, activeModal);
    }

}
