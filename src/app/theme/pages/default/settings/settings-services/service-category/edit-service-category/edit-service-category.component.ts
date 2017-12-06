import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ServiceCategoryDialogBase} from "../service-category-dialog-base/service-category-dialog-base.component";
import {Action, Store} from "@ngrx/store";
import {ServiceCategoryModel} from "../../../../../../../services-category/service-category.model";
import * as fromRoot from "../../../../reducers";
import * as categoryActions from "../../../../../../../services-category/actions/collection";

@Component({
    selector: 'app-edit-service-category',
    templateUrl: './edit-service-category.component.html',
    styleUrls: ['./edit-service-category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditServiceCategoryComponent extends ServiceCategoryDialogBase {
    protected createSaveAction(category: ServiceCategoryModel): Action {
        return categoryActions.collectionActions.UpdateEntity(category);
    }

    constructor(protected store$: Store<fromRoot.State>) {
        super(store$);
    }
}
