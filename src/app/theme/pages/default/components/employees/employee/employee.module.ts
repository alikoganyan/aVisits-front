import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from "./employee.component";
import { LayoutModule } from "../../../../../layouts/layout.module";
import { DefaultComponent } from "../../../default.component";
import { FormsModule } from "@angular/forms";
import { EmployeeService } from "../../../../../_services/employee.service";
import { AccordionModule } from "primeng/primeng";
const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": EmployeeComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AccordionModule,
        LayoutModule,
        FormsModule
    ], exports: [
        RouterModule
    ], declarations: [
        EmployeeComponent
    ],
    providers: [
        EmployeeService
    ]
})
export class EmployeeModule {
}
