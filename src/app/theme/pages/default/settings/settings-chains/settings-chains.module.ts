import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SettingsChainsComponent } from "./settings-chains.component";
import { ChainEditFormComponent } from './chain-edit-form/chain-edit-form.component';
import { ChainRowComponent } from './chain-row/chain-row.component';
import { CreateChainComponent } from './create-chain/create-chain.component';
import { EditChainComponent } from './edit-chain/edit-chain.component';
import { FormsModule } from "@angular/forms";

const chainRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: SettingsChainsComponent
            },
            {
                path: 'create',
                component: CreateChainComponent
            },
            {
                path: 'edit/:id',
                component: EditChainComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(chainRoutes),
        FormsModule,
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
    ]
})
export class SettingsChainsModule {
}
