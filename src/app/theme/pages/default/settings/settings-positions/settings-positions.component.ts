import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as fromRoot from '../../reducers';
import * as fromChain from '../../reducers/chain';
import * as fromPositions from '../../reducers/positions';
import * as fromAuth from '../../../../../auth/reducers';
import * as filterReducer from '../../reducers/filter';
import * as positionActions from '../../../../../position/actions/collection';
import * as chainActions from '../../../../../chain/actions/collection';
import * as filterActions from '../../../../../filter/actions/filter';

import {Store} from "@ngrx/store";
import {ModalConfig, ModalService} from "../../../../../shared/modal.service";
import {Salon} from "../../../../../salon/salon.model";
import * as salonActions from "../../../../../salon/actions/collection";
import {EditSalonComponent} from "../settings-salons/edit-salon/edit-salon.component";
import {CreateSalonComponent} from "../settings-salons/create-salon/create-salon.component";
import {EmployeePosition} from "../../../../../position/position.model";
import {CreatePositionComponent} from "./create-position/create-position.component";
import {EditPositionComponent} from "./edit-position/edit-position.component";

@Component({
    selector: 'app-settings-positions',
    templateUrl: './settings-positions.component.html',
    styleUrls: ['./settings-positions.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPositionsComponent implements OnInit {
    positions$ = this.store$.select(fromPositions.selectAllPositions);
    operationComplete$ = this.store$.select(fromPositions.selectOperationComplete);

    selectedChain$ = this.store$.select(filterReducer.selectFilterChainId);

    chains$ = this.store$.select(fromChain.selectAllChains);
    chainsFilterDS$ = this.chains$
        .do(console.log)
        .map(chains => chains.map(c => ({ id: c.id, title: c.title})));

    private modal: any;

    constructor(private store$: Store<fromRoot.State>,
                private modalService: ModalService,
                ) {
    }

    ngOnInit() {
        // TODO: move higher as a global filter state
        // this.store$.select(fromAuth.getSelectedChain)
        //     .subscribe(
        //         chain => this.store$.dispatch(chainActions.collectionActions.SetCurrentEntity(chain))
        //     );
        this.store$.dispatch(chainActions.collectionActions.LoadAll());

        this.selectedChain$
            .filter(chainId => !!chainId)
            .subscribe(
            chainId => this.store$.dispatch(positionActions.collectionActions.LoadAll(chainId))
            );

        this.operationComplete$
            .filter(next => next === true)
            .subscribe(
                operationComplete => this.modal.close()
            )
    }

    onChainFilterChanged(chainId) {
        this.store$.dispatch(new filterActions.SetFilterChainId(chainId));
    }

    openModalForm(form: any, position: EmployeePosition): void {
        this.store$.dispatch(positionActions.collectionActions.SetCurrentEntity(position));
        this.modal = this.modalService.open(new ModalConfig(form, { size: 'md' }));
    }

    openCreatePositionForm(): void {
        this.selectedChain$
            .subscribe(chainId =>
                this.openModalForm(CreatePositionComponent, new EmployeePosition(/*{chain_id: chainId}*/))
            );
    }

    openEditPositionForm(position: EmployeePosition): void {
        this.openModalForm(EditPositionComponent, position);
    }
}
