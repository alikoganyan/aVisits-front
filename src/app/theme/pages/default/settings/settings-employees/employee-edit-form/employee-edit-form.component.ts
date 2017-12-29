import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {EditFormBase} from "../../edit-form-base";
import {Employee} from "../../../../../../employee/employee.model";
import {Store} from "@ngrx/store";
import * as employeeActions from "../../../../../../employee/actions/collection";
import * as fromRoot from "../../../reducers";
import * as fromEmployee from "../../../reducers/employee";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as fromPositions from "../../../reducers/positions";
import _ = require("lodash");
import * as fromSalonsCollection from "../../../reducers/salon-collection";
import * as fromSalons from "../../../reducers/salon";
import * as fromService from "../../../reducers/salon-service";
import * as fromServiceCategory from "../../../reducers/service-category";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import "rxjs/add/observable/from";

@Component({
    selector: 'app-employee-edit-form',
    templateUrl: './employee-edit-form.component.html',
    styleUrls: ['./employee-edit-form.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeEditFormComponent extends EditFormBase<Employee> {
    protected get createTitle() { return 'Добавление сотрудника'; }
    protected get editTitle() { return 'Редактирование сотрудника'; }

    salonIds$ = new BehaviorSubject(null);

    salonEntities$ = this.store$.select(fromSalonsCollection.selectSalonEntities);
    chainSalons$ = this.store$.select(fromSalons.filterSalonsByChain);
    services$ = this.store$.select(fromService.selectServicesTreeDataSource);
        // .map(services => this.filterItems({items: services}));

    employeeSalons$ = this.salonIds$
        .withLatestFrom(this.salonEntities$)
        .map(([ids, salons]) =>
            ids.map(id => salons[id])
        );

    attachableSalons$ = this.salonIds$
        .withLatestFrom(this.chainSalons$)
        .map(([ids, salons]) =>
            salons.filter(s => ids.indexOf(s.id) < 0)
        );

    positionsDataSource$ = this.store$.select(fromPositions.filterPositionsByChain);


    newSalonLink: any = {};

    serviceIds: any;

    constructor(public activeModal: NgbActiveModal,
                private store$: Store<fromRoot.State>) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();

        this.renderSalonLinks();

        this.serviceIds = this.data.services.map(s => s.service_id);

    }

    onClose() {
        // TODO: check for changes in form
        this.activeModal.close();
        this.store$.dispatch(employeeActions.collectionActions.FinishOperation());
    }

    onPositionChanged(position_id) {
        this.data.position_id = position_id;
    }

    /**
     * salon attach / detach
     */
    onAttachSalonChanged(salon_id) {
        this.newSalonLink.salon_id = salon_id;
    }

    onAttachPositionChanged(salon_id) {
        this.newSalonLink.position_id = salon_id;
    }

    attachEmployeeToSalon() {
        this.data.salonIds.push(this.newSalonLink.salon_id);


        this.renderSalonLinks();
    }

    detachEmployeeFromSalon(salon) {
        _.remove(this.data.salonIds, s => s === salon.id);

        this.renderSalonLinks();
    }

    renderSalonLinks() {
        this.salonIds$.next(this.data.salonIds);
    }
}
