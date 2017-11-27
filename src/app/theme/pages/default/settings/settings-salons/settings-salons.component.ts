import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SalonService } from "../../../../../salon/salon.service";
import { ChainService } from "../../../../../chain/chain.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Salon } from "../../../../../salon/salon.model";
import {CreateSalonComponent} from "./create-salon/create-salon.component";
import {EditSalonComponent} from "./edit-salon/edit-salon.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfig, ModalService} from "../../../../../shared/modal.service";
import * as fromSalon from '../../reducers/salon';
import * as fromChain from '../../reducers/chain';
import * as fromAuth from '../../../../../auth/reducers';
import * as fromRoot from '../../reducers';
import * as salonActions from '../../../../../salon/actions/collection';
import * as chainActions from '../../../../../chain/actions/collection';
import {Store} from "@ngrx/store";

@Component({
    selector: 'app-settings-salons',
    templateUrl: './settings-salons.component.html',
    styleUrls: ['./settings-salons.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SettingsSalonsComponent implements OnInit {
    salons$ = this.store.select(fromSalon.selectAllSalons);
    chains$ = this.store.select(fromChain.selectAllChains);
    selectedChain$ = this.store.select(fromAuth.getSelectedChainId);

    private modal: any;

    constructor(private store: Store<fromRoot.State>,
                private modalService: ModalService) {
    }

    ngOnInit() {
        this.store.dispatch(new salonActions.LoadAll());
        this.store.dispatch(new chainActions.LoadAll());
    }


    openModalForm(form: any, salon: Salon): void {
        this.store.dispatch(new salonActions.SetCurrentSalon(salon));
        this.modal = this.modalService.open(new ModalConfig(form, { size: 'lg' }));
    }

    openCreateSalonForm(): void {
        this.openModalForm(CreateSalonComponent, new Salon());
    }

    openEditSalonForm(salon: Salon): void {
        this.openModalForm(EditSalonComponent, salon);

    }
}
