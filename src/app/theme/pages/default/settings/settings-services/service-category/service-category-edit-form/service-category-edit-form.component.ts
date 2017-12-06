import {Component, OnInit} from '@angular/core';
import {EditFormBase} from "../../../edit-form-base";
import {ServiceCategoryModel} from "../../../../../../../services-category/service-category.model";
import {createSelector, Store} from "@ngrx/store";
import * as fromRoot from "../../../../reducers";
import * as categoryActions from '../../../../../../../services-category/actions/collection';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as fromCategory from "../../../../reducers/service-category";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import "rxjs/add/operator/combineLatest";

@Component({
    selector: 'app-service-category-edit-form',
    templateUrl: './service-category-edit-form.component.html',
    styleUrls: ['./service-category-edit-form.component.scss'],
})
export class ServiceCategoryEditFormComponent extends EditFormBase<ServiceCategoryModel> {

    protected get createTitle() { return 'Добавление категории'; }
    protected get editTitle() { return 'Редактирование категории'; }

    categories$ = this.store$.select(fromCategory.selectServiceCategoriesExtendedDataSource);

    parentIdSubject$ = new BehaviorSubject<any>(-1);

    constructor(public activeModal: NgbActiveModal,
                private store$: Store<fromRoot.State>) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();

        if(this.data.parent_id) {
            this.parentIdSubject$.next(this.data.parent_id);
        }
    }

    setParentId(id: number) {
        this.parentIdSubject$.next(id);
    }

    onClose() {
        this.activeModal.close();
        this.store$.dispatch(categoryActions.collectionActions.FinishOperation());
    }

    categoryTreeView_itemSelectionChanged(e) {
        let selectedId = e.itemData.id;

        this.setParentId(selectedId);
        this.data.parent_id = selectedId > 0 ? selectedId : null;
    }
}
