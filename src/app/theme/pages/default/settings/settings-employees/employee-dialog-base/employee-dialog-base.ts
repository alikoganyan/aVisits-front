import {OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../reducers";
import * as filterReducer from "../../../../../../reducers/filter";
import {Subscription} from "rxjs/Subscription";
import {Employee} from "../../../../../../employee/employee.model";
import * as fromEmployee from "../../../reducers/employee";
import * as employeeActions from "../../../../../../employee/actions/collection";

export abstract class EmployeeDialogBase implements OnInit {
    employee$ = this.store$.select(fromEmployee.selectCurrentEmployee);
    error$ = this.store$.select(fromEmployee.selectError);
    loading$ = this.store$.select(fromEmployee.selectLoading);

    selectedChainId: number;
    selectedChainIdSubscription: Subscription;


    protected abstract createSaveAction(position: Employee);

    constructor(protected store$: Store<fromRoot.State>) {
    }

    ngOnInit() {
        this.selectedChainIdSubscription = this.store$.select(filterReducer.selectFilterChainId)
            .subscribe(
                next => this.selectedChainId = next
            );
    }

    onSaveEmployee(employee: Employee) {
        this.store$.dispatch(this.createSaveAction(employee));
    }

    onDeleteEmployee(employee: Employee) {
        this.store$.dispatch(employeeActions.collectionActions.RemoveEntity(employee));
    }
}
