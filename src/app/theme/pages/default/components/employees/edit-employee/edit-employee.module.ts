import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EditEmployeeComponent} from "./edit-employee.component";
import { LayoutModule } from "../../../../../layouts/layout.module";
import { DefaultComponent } from "../../../default.component";
import { FormsModule } from "@angular/forms";
import { AccordionModule } from "primeng/primeng";
const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": EditEmployeeComponent
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
        EditEmployeeComponent
    ]
})
export class EditEmployeeModule {
}
