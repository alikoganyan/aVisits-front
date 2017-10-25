import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { ChainsComponent } from "./chains.component";
import { LayoutModule } from "../../../../layouts/layout.module";
import { DefaultComponent } from "../../default.component";
import { CreateChainComponent } from './create-chain/create-chain.component';
import { EditChainComponent } from './edit-chain/edit-chain.component';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": ChainsComponent
            },
            {
                "path": "create-chain",
                "component": CreateChainComponent
            },
            {
                "path": "edit-chain/:id",
                "component": EditChainComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule,
        FormsModule
    ], exports: [
        RouterModule
    ], declarations: [
        ChainsComponent,
        CreateChainComponent,
        EditChainComponent
    ]
})
export class ChainsModule {
}