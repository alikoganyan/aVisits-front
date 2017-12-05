import {OnInit} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import * as fromRoot from "../../../../reducers";
import * as fromCategory from "../../../../reducers/service-category";
import * as categoryActions from "../../../../../../../services-category/actions/collection";
import {ServiceCategoryModel} from "../../../../../../../services-category/service-category.model";

export abstract class ServiceCategoryDialogBase implements OnInit {
    category$ = this.store$.select(fromCategory.selectCurrentServiceCategory);
    error$ = this.store$.select(fromCategory.selectError);
    loading$ = this.store$.select(fromCategory.selectLoading);

    protected abstract createSaveAction(category: ServiceCategoryModel): Action;

    constructor(protected store$: Store<fromRoot.State>) {
    }

    ngOnInit() {
    }

    onSaveCategory(category: ServiceCategoryModel) {
        this.store$.dispatch(this.createSaveAction(category));
    }

    onDeleteCategory(category: ServiceCategoryModel) {
        this.store$.dispatch(categoryActions.collectionActions.RemoveEntity(category));
    }
}