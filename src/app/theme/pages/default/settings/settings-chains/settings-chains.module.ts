import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SettingsChainsComponent } from "./settings-chains.component";
import { ChainEditFormComponent } from './chain-edit-form/chain-edit-form.component';
import { ChainRowComponent } from './chain-row/chain-row.component';
import { CreateChainComponent } from './create-chain/create-chain.component';
import { EditChainComponent } from './edit-chain/edit-chain.component';
import { FormsModule } from "@angular/forms";
import {SharedModule} from "../../../../../shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
// import {reducers} from "../../../../../chain/reducers/index";
import {ChainEffects} from "../../../../../chain/effects/chain.effects";
import {ModalService} from "../../../../../shared/modal.service";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {DxFileUploaderModule} from "devextreme-angular";

const chainRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: SettingsChainsComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(chainRoutes),
        FormsModule,
        SharedModule,
        NgbModalModule.forRoot(),

        DxFileUploaderModule,
        // StoreModule.forFeature('chains', reducers),
        // EffectsModule.forFeature([ChainEffects]),
    ],
    exports: [
        RouterModule,
    ],
    declarations: [
        ChainEditFormComponent,
        SettingsChainsComponent,
        ChainRowComponent,
        CreateChainComponent,
        EditChainComponent
    ],
    providers: [
        ModalService
    ],
    entryComponents: [
        CreateChainComponent,
        EditChainComponent
    ]
})
export class SettingsChainsModule {
}
