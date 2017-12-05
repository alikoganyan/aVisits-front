import {Component, OnInit} from '@angular/core';
import {EditFormBase} from "../../../edit-form-base";
import {ServiceCategoryModel} from "../../../../../../../services-category/service-category.model";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../../reducers";
import * as categoryActions from '../../../../../../../services-category/actions/collection';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-service-category-edit-form',
    templateUrl: './service-category-edit-form.component.html',
    styleUrls: ['./service-category-edit-form.component.scss'],
})
export class ServiceCategoryEditFormComponent extends EditFormBase<ServiceCategoryModel> {

    protected get createTitle() { return 'Добавление категории'; }
    protected get editTitle() { return 'Редактирование категории'; }

    constructor(public activeModal: NgbActiveModal,
                private store$: Store<fromRoot.State>) {
        super();
    }

    onClose() {
        this.activeModal.close();
        this.store$.dispatch(categoryActions.collectionActions.FinishOperation());
    }
}
