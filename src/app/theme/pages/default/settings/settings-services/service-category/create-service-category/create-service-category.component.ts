import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ServiceCategoryDialogBase} from "../service-category-dialog-base/service-category-dialog-base.component";
import * as categoryActions from "../../../../../../../services-category/actions/collection";
import {Action, Store} from "@ngrx/store";
import {ServiceCategoryModel} from "../../../../../../../services-category/service-category.model";
import * as fromRoot from "../../../../reducers";

@Component({
    selector: 'app-create-service-category',
    templateUrl: './create-service-category.component.html',
    styleUrls: ['./create-service-category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateServiceCategoryComponent extends ServiceCategoryDialogBase {
    protected createSaveAction(category: ServiceCategoryModel): Action {
        return categoryActions.collectionActions.AddEntity(category);
    }

    constructor(protected store$: Store<fromRoot.State>) {
        super(store$);
    }

}
