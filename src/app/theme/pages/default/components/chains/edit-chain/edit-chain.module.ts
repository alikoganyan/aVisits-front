import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { EditChainComponent } from "./edit-chain.component";
import { LayoutModule } from "../../../../../layouts/layout.module";
import { DefaultComponent } from "../../../default.component";


const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": EditChainComponent
            },
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
        EditChainComponent
    ]
})
export class EditChainModule {
}
