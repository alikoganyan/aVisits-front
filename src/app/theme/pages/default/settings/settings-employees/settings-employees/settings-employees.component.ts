import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
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
import * as salonActions from "../../../../../../salon/actions/collection";
import * as chainActions from "../../../../../../chain/actions/collection";
import * as positionActions from "../../../../../../position/actions/collection";
import * as serviceActions from "../../../../../../salon-service/actions/collection";
import * as categoryActions from "../../../../../../services-category/actions/collection";

@Component({
    selector: 'app-settings-employees',
    templateUrl: './settings-employees.component.html',
    styleUrls: ['./settings-employees.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
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

    protected get createEntityComponent() {
        return CreateEmployeeComponent;
    }

    protected get editEntityComponent() {
        return EditEmployeeComponent;
    }

    protected get operationCompleteSelector(): MemoizedSelector<Object, boolean> {
        return fromEmployees.selectOperationSuccessful;
    }

    protected get shouldFetchEntityForEdit(): boolean {
        return true;
    }

    getModalSize(entity?: UniqueEntity): string {
        return 'lg';
    }

    constructor(protected store$: Store<fromRoot.State>,
                protected modalService: ModalService,
                protected activeModal: NgbActiveModal,) {
        super(store$, modalService, activeModal);
    }

    loadEntities() {
        super.loadEntities();

        this.store$.dispatch(chainActions.collectionActions.LoadAll());
        this.store$.dispatch(salonActions.collectionActions.LoadAll());
        this.store$.dispatch(positionActions.collectionActions.LoadAll(this.filterChainId));
        this.store$.dispatch(categoryActions.collectionActions.LoadAll(this.filterChainId));
        this.store$.dispatch(serviceActions.collectionActions.LoadAll(this.filterChainId));
    }


}
