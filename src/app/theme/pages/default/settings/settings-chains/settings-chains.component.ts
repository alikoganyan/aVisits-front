import {
    ChangeDetectionStrategy,
    Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { Chain } from "../../../../../chain/chain.model";
import {CreateChainComponent} from "./create-chain/create-chain.component";
import {EditChainComponent} from "./edit-chain/edit-chain.component";
import {MemoizedSelector, Selector, Store} from "@ngrx/store";
import * as fromChain from '../../reducers/chain';
import * as fromRoot from '../../reducers';
import * as chainActions from '../../../../../chain/actions/collection';
import * as layoutActions from '../../../../../shared/actions/layout';
import {ModalConfig, ModalService} from "../../../../../shared/modal.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SettingsMasterViewComponent} from "../settings-page-base/settings-master-view-component";
import {EntityCollectionActions} from "../../../../../entity-collection/entity-collection.actions";

@Component({
    selector: 'app-settings-chains',
    templateUrl: './settings-chains.component.html',
    styleUrls: ['./settings-chains.component.scss'],
    encapsulation: ViewEncapsulation.None,
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsChainsComponent extends SettingsMasterViewComponent<Chain> {
    /**
     * override properties
     */
    protected get operationCompleteSelector(): MemoizedSelector<Object, boolean> {
        return fromChain.selectOperationSuccessful;
    }

    protected get entitiesSelector(): MemoizedSelector<Object, any> {
        return fromChain.selectAllChains;
    }
    protected get entityCollectionActions(): EntityCollectionActions<Chain> {
        return chainActions.collectionActions;
    }

    getModalSize() {
        return 'md';
    }

    protected get createEntityComponent() {
        return CreateChainComponent;
    }

    protected get editEntityComponent() {
        return EditChainComponent;
    }

    /**
     * override methods
     */
    protected createEntityInstance(): Chain {
        return new Chain();
    }


    constructor(protected store$: Store<fromRoot.State>,
                protected modalService: ModalService,
                protected activeModal: NgbActiveModal,) {
        super(store$, modalService, activeModal);
    }
}