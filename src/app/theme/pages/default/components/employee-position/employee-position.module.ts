import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeePositionComponent } from "./employee-position.component";
import { LayoutModule} from "../../../../layouts/layout.module";
import { DefaultComponent } from "../../default.component";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": EmployeePositionComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule
    ], exports: [
        RouterModule
    ], declarations: [
        EmployeePositionComponent
    ]
})
export class EmployeePositionModule {
}