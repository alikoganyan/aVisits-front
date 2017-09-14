import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ServicesComponent} from "./services.component";
import {LayoutModule} from "../../../../layouts/layout.module";
import {DefaultComponent} from "../../default.component";
import {AccordionModule} from "primeng/primeng";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": ServicesComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule,
        AccordionModule
    ], exports: [
        RouterModule
    ], declarations: [
        ServicesComponent
    ]
})
export class ServicesModule {
}