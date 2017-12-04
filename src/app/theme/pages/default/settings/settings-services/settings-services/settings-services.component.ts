import { Component, OnInit } from '@angular/core';
import {SettingsMasterViewComponent} from "../../settings-page-base/settings-master-view-component";
import {SalonServiceModel} from "../../../../../../salon-service/salon-service.model";
import {ServiceCategoryModel} from "../../../../../../services-category/service-category.model";
import {MemoizedSelector, Store} from "@ngrx/store";
import {EntityCollectionActions} from "../../../../../../entity-collection/entity-collection.actions";
import {ModalService} from "../../../../../../shared/modal.service";
import * as fromRoot from "../../../reducers";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-settings-services',
  templateUrl: './settings-services.component.html',
  styleUrls: ['./settings-services.component.scss']
})
export class SettingsServicesComponent extends SettingsMasterViewComponent<SalonServiceModel | ServiceCategoryModel> {
    protected get operationCompleteSelector(): MemoizedSelector<Object, boolean> {
        return undefined;
    }

    protected get entitiesSelector(): MemoizedSelector<Object, any> {
        return undefined;
    }

    protected createEntityInstance(): SalonServiceModel | ServiceCategoryModel {
        return undefined;
    }

    protected get entityCollectionActions(): EntityCollectionActions<SalonServiceModel | ServiceCategoryModel> {
        return undefined;
    }

    protected get modalSize(): string {
        return 'xl';
    }

    protected get createEntityComponent() {
        return null;
    }

    protected get editEntityComponent() {
        return null;
    }

    constructor(protected store$: Store<fromRoot.State>,
                protected modalService: ModalService,
                protected activeModal: NgbActiveModal,) {
        super(store$, modalService, activeModal);
    }

    openCreateCategoryForm() {

    }

    openCreateServiceForm() {

    }
}
