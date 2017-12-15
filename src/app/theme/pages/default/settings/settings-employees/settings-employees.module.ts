import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsEmployeesComponent} from './settings-employees/settings-employees.component';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import {EmployeeEditFormComponent} from './employee-edit-form/employee-edit-form.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../shared/shared.module";
import { EmployeeRowComponent } from './settings-employees/employee-row/employee-row.component';


const employeeRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: SettingsEmployeesComponent
            }
        ]
    },
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(employeeRoutes),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    declarations: [
        SettingsEmployeesComponent,
        CreateEmployeeComponent,
        EditEmployeeComponent,
        EmployeeEditFormComponent,
        EmployeeRowComponent
    ],
    entryComponents: [
        CreateEmployeeComponent,
        EditEmployeeComponent,
    ]
})
export class SettingsEmployeesModule {
}
