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
        SharedModule
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
    entryComponents: [
        CreateChainComponent,
        EditChainComponent
    ]
})
export class SettingsChainsModule {
}
