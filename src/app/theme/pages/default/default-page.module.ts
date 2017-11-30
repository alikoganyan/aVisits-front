import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbActiveModal, NgbModal, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {SalonService} from "../../../salon/salon.service";
import {GeoNamesService} from "../../../shared/_services/geo-names.service";
import {BackendService} from "../../../backend/backend.service";
import {ModalService} from "../../../shared/modal.service";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./reducers/index";
import {EffectsModule} from "@ngrx/effects";
import {ChainEffects} from "../../../chain/effects/chain.effects";
import {SalonCollectionEffects} from "../../../salon/effects/collection.effects";
import {SalonEffects} from "../../../salon/effects/salon.effects";
import * as fromChain from "../../../chain/actions/collection";
import * as fromSalon from "../../../salon/actions/collection";

@NgModule({
    imports: [
        CommonModule,
        NgbModalModule.forRoot(),
        StoreModule.forFeature('default-page', reducers),
        EffectsModule.forFeature([
            ChainEffects,
            SalonCollectionEffects,
            SalonEffects,
        ])
    ],
    declarations: [],
    providers: [
        SalonService,
        GeoNamesService,
        BackendService,
        ModalService,
        NgbModal,
        NgbModalStack,
        NgbActiveModal,
        { provide: fromChain.ChainCollectionActions, useValue: fromChain.collectionActions },
        { provide: fromSalon.SalonCollectionActions, useValue: fromSalon.collectionActions },
    ]
})
export class DefaultPageModule {
}
