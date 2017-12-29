import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeScheduleComponent} from './employee-schedule.component';
import {SettingsEmployeesComponent} from "../settings/settings-employees/settings-employees/settings-employees.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../../shared/shared.module";
import {DxDateBoxModule, DxSelectBoxModule} from "devextreme-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const employeeScheduleRoutes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: EmployeeScheduleComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(employeeScheduleRoutes),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,

        DxSelectBoxModule,
        DxDateBoxModule,
    ],
    declarations: [
        EmployeeScheduleComponent
    ]
})
export class EmployeeScheduleModule {
}
