import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { ChainsComponent } from "./chains.component";
import { LayoutModule } from "../../../../layouts/layout.module";
import { DefaultComponent } from "../../default.component";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": ChainsComponent
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
        ChainsComponent
    ]
})
export class ChainsModule {
}