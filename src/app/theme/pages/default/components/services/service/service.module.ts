import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { ServiceComponent } from "./service.component";
import { LayoutModule } from "../../../../../layouts/layout.module";
import { DefaultComponent } from "../../../default.component";
import { AccordionModule } from "primeng/primeng";
import { CreateServicesService } from "../../../../../_services/create-services.service";



const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": ServiceComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule,
        AccordionModule,
        FormsModule
    ], exports: [
        RouterModule
    ], declarations: [
        ServiceComponent,
    ],
    providers: [
        CreateServicesService
    ]
})
export class ServiceModule {
}