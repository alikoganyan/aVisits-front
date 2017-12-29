import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as fromRoot from '../../reducers';
import * as fromChain from '../../reducers/chain';
import * as fromFilter from '../../reducers/filter';
import * as fromPositions from '../../reducers/positions';
import * as positionActions from '../../../../../position/actions/collection';
import * as chainActions from '../../../../../chain/actions/collection';
import * as filterActions from '../../../../../filter/actions/filter';

import {MemoizedSelector, Store} from "@ngrx/store";
import {ModalConfig, ModalService} from "../../../../../shared/modal.service";
import {EmployeePosition} from "../../../../../position/position.model";
import {CreatePositionComponent} from "./create-position/create-position.component";
import {EditPositionComponent} from "./edit-position/edit-position.component";
import {SettingsMasterViewComponent} from "../settings-page-base/settings-master-view-component";
import {EntityCollectionActions} from "../../../../../entity-collection/entity-collection.actions";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as filterReducer from "../../../../../reducers/filter";

@Component({
    selector: 'app-settings-positions',
    templateUrl: './settings-positions.component.html',
    styleUrls: ['./settings-positions.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPositionsComponent extends SettingsMasterViewComponent<EmployeePosition> {
    /**
     * override properties
     */
    protected get operationCompleteSelector(): MemoizedSelector<Object, boolean> {
        return fromPositions.selectOperationComplete;
    }

    protected get entitiesSelector(): MemoizedSelector<Object, any> {
        return fromPositions.selectAllPositions;
    }
    protected get entityCollectionActions(): EntityCollectionActions<EmployeePosition> {
        return positionActions.collectionActions;
    }

    getModalSize(): string {
        return 'md';
    }

    protected get createEntityComponent() {
        return CreatePositionComponent
    }

    protected get editEntityComponent() {
        return EditPositionComponent
    }

    /**
     * override methods
     */
    protected createEntityInstance(): EmployeePosition {
        return new EmployeePosition();
    }

    subscribeToStore() {
        super.subscribeToStore();

        this.filterChainId$
            .filter(chainId => !!chainId)
            .subscribe(
                chainId => this.store$.dispatch(positionActions.collectionActions.LoadAll(chainId))
            );
    }

    /**
     * own properties
     */
    filterChainId$ = this.store$.select(filterReducer.selectFilterChainId);


    constructor(protected store$: Store<fromRoot.State>,
                protected modalService: ModalService,
                protected activeModal: NgbActiveModal,) {
        super(store$, modalService, activeModal);
    }
}
