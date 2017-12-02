import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsPositionsComponent} from './settings-positions.component';
import {PositionRowComponent} from './position-row/position-row.component';
import {EditPositionComponent} from './edit-position/edit-position.component';
import {CreatePositionComponent} from './create-position/create-position.component';
import {PositionEditFormComponent} from './position-edit-form/position-edit-form.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../shared/shared.module";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule, Routes} from "@angular/router";
import {DxSelectBoxModule} from "devextreme-angular";

const employeePositionRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: SettingsPositionsComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        NgbModalModule.forRoot(),
        RouterModule.forChild(employeePositionRoutes),

        DxSelectBoxModule,

    ],
    declarations: [
        SettingsPositionsComponent,
        PositionRowComponent,
        EditPositionComponent,
        CreatePositionComponent,
        PositionEditFormComponent,
    ],
    entryComponents: [
        CreatePositionComponent,
        EditPositionComponent
    ]
})
export class SettingsPositionsModule {
}
