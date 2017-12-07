import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Salon } from "../../../../../salon/salon.model";
import {CreateSalonComponent} from "./create-salon/create-salon.component";
import {EditSalonComponent} from "./edit-salon/edit-salon.component";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfig, ModalService} from "../../../../../shared/modal.service";
import * as fromSalon from '../../reducers/salon';
import * as fromFilter from '../../reducers/filter';
import * as fromRoot from '../../reducers';
import * as salonActions from '../../../../../salon/actions/collection';
import * as chainActions from '../../../../../chain/actions/collection';
import * as filterReducer from '../../../../../reducers/filter';
import * as filterActions from '../../../../../filter/actions/filter';
import {MemoizedSelector, Store} from "@ngrx/store";
import "rxjs/add/observable/of";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import {SettingsMasterViewComponent} from "../settings-page-base/settings-master-view-component";
import {EntityCollectionActions} from "../../../../../entity-collection/entity-collection.actions";

@Component({
    selector: 'app-settings-salons',
    templateUrl: './settings-salons.component.html',
    styleUrls: ['./settings-salons.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsSalonsComponent extends SettingsMasterViewComponent<Salon> {
    /**
     * override properties
     */
    protected get operationCompleteSelector(): MemoizedSelector<Object, boolean> {
        return fromSalon.selectOperationSuccessful;
    }

    protected get entitiesSelector(): MemoizedSelector<Object, any> {
        return fromSalon.selectSalons;
    }

    protected get entityCollectionActions(): EntityCollectionActions<Salon> {
        return salonActions.collectionActions;
    }

    getModalSize(): string {
        return 'lg';
    }

    protected get createEntityComponent() {
        return CreateSalonComponent;
    }

    protected get editEntityComponent() {
        return EditSalonComponent;
    }

    /**
     * override methods
     */
    protected createEntityInstance(): Salon {
        return new Salon({ chain_id: this.selectedChainId });
    }

    loadEntities() {
        super.loadEntities();

        this.store$.dispatch(chainActions.collectionActions.LoadAll());
    }

    ngOnInit() {
        super.ngOnInit();

        this.filterChainId$.subscribe(
            next => this.selectedChainId = next
        );
    }

    /**
     * own properties
     */
    filterChainId$ = this.store$.select(filterReducer.selectFilterChainId);
    selectedChainId: number;

    constructor(protected store$: Store<fromRoot.State>,
                protected modalService: ModalService,
                protected activeModal: NgbActiveModal,) {
        super(store$, modalService, activeModal);
    }
}
