import { Component, OnInit } from '@angular/core';
import {SettingsMasterViewComponent} from "../../settings-page-base/settings-master-view-component";
import {SalonServiceModel} from "../../../../../../salon-service/salon-service.model";
import {ServiceCategoryModel} from "../../../../../../services-category/service-category.model";
import {Action, createSelector, MemoizedSelector, Store} from "@ngrx/store";
import {EntityCollectionActions} from "../../../../../../entity-collection/entity-collection.actions";
import {ModalService} from "../../../../../../shared/modal.service";
import * as fromRoot from "../../../reducers";
import * as fromCategory from "../../../reducers/service-category";
import * as fromService from "../../../reducers/salon-service";
import * as fromFilter from '../../../reducers/filter';

import * as chainActions from '../../../../../../chain/actions/collection';
import * as serviceActions from '../../../../../../salon-service/actions/collection';
import * as categoryActions from '../../../../../../services-category/actions/collection';
import * as filterActions from '../../../../../../filter/actions/filter';

import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SettingsMasterViewComponentBase} from "../../settings-page-base/settings-master-view-component-base";
import {UniqueEntity} from "../../../../../../entity-collection/unique-entity";
import {CreateSalonServiceComponent} from "../salon-service/create-salon-service/create-salon-service.component";
import {CreateServiceCategoryComponent} from "../service-category/create-service-category/create-service-category.component";
import {EditSalonServiceComponent} from "../salon-service/edit-salon-service/edit-salon-service.component";
import * as positionActions from "../../../../../../position/actions/collection";
import * as filterReducer from "../../../../../../reducers/filter";

@Component({
  selector: 'app-settings-services',
  templateUrl: './settings-services.component.html',
  styleUrls: ['./settings-services.component.scss']
})
export class SettingsServicesComponent extends SettingsMasterViewComponentBase {
    protected get operationCompleteSelector(): MemoizedSelector<Object, boolean> {
        return createSelector(
            fromService.selectOperationComplete,
            fromCategory.selectOperationComplete,
            (a, b) => a || b
        )
    }

    subscribeToStore(): void {
        super.subscribeToStore();

        this.filterChainId$
            .filter(chainId => !!chainId)
            .subscribe(
                chainId => {
                    this.store$.dispatch(categoryActions.collectionActions.LoadAll(chainId));
                    this.store$.dispatch(serviceActions.collectionActions.LoadAll(chainId));
                }
            );
    }

    loadEntities(): void {
        this.store$.dispatch(chainActions.collectionActions.LoadAll());
    }

    getModalSize(entity?: UniqueEntity): string {
        return 'lg';
    }

    getSetCurrentEntityAction(entity: UniqueEntity): Action {
        return entity instanceof SalonServiceModel
            ? serviceActions.collectionActions.SetCurrentEntity(entity)
            : categoryActions.collectionActions.SetCurrentEntity(entity);
    }

    filterChainId$ = this.store$.select(filterReducer.selectFilterChainId);
    categories$ = this.store$.select(fromCategory.selectAllServiceCategories);
    categoriesTVDataSource$ = this.store$.select(fromCategory.selectServiceCategoriesDataSource);

    constructor(protected store$: Store<fromRoot.State>,
                protected modalService: ModalService,
                protected activeModal: NgbActiveModal,) {
        super(store$, modalService, activeModal);
    }


    /**
     * category
     */
    openCreateCategoryForm() {
        let category = new ServiceCategoryModel();
        this.openModalForm(CreateServiceCategoryComponent, category);
    }

    openEditCategoryForm(category: ServiceCategoryModel) {
        this.openModalForm(CreateServiceCategoryComponent, category);
    }

    /**
     * service
     */
    openCreateServiceForm() {
        let service = new SalonServiceModel();
        this.openModalForm(CreateSalonServiceComponent, service);
    }

    openEditServiceForm(service: SalonServiceModel) {
        this.openModalForm(EditSalonServiceComponent, service);
    }



}
