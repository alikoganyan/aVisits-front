import {
    ChangeDetectionStrategy,
    Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { Chain } from "../../../../../chain/chain.model";
import {CreateChainComponent} from "./create-chain/create-chain.component";
import {EditChainComponent} from "./edit-chain/edit-chain.component";
import {Store} from "@ngrx/store";
import * as fromChain from '../../reducers/chain';
import * as fromRoot from '../../reducers';
import * as chainActions from '../../../../../chain/actions/collection';
import * as layoutActions from '../../../../../shared/actions/layout';
import {ModalConfig, ModalService} from "../../../../../shared/modal.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-settings-chains',
    templateUrl: './settings-chains.component.html',
    styleUrls: ['./settings-chains.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsChainsComponent implements OnInit {
    chains$ = this.store.select(fromChain.selectAllChains);
    operationSuccessful$ = this.store.select(fromChain.selectOperationSuccessful);
    // showModal$ = this.store.select(fromRoot.getShowModal);

    private modal: any;

    constructor(
        private store: Store<fromRoot.State>,
        private modalService: ModalService,
        public activeModal: NgbActiveModal,
        ) {

    }

    ngOnInit() {
        this.store.dispatch(new chainActions.LoadAll());
        this.operationSuccessful$
            .filter(next => next === true)
            .subscribe(
            operationSuccessful => this.modal.close()
            )
    }

    openModalForm(form: any, chain: Chain): void {
        this.store.dispatch(new chainActions.SetCurrentChain(chain.id));
        this.modal = this.modalService.open(new ModalConfig(form, {size: 'md' }));
        // this.store.dispatch(new layoutActions.OpenModal());
    }


    openCreateForm(): void {
        this.openModalForm(CreateChainComponent, new Chain());
    }

    openEditForm(chain: Chain): void {
        this.openModalForm(EditChainComponent, chain);
    }

}
