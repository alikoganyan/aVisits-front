import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsServicesComponent} from './settings-services/settings-services.component';
import {RouterModule, Routes} from "@angular/router";
import { CreateServiceCategoryComponent } from './service-category/create-service-category/create-service-category.component';
import { EditServiceCategoryComponent } from './service-category/edit-service-category/edit-service-category.component';
import { CreateSalonServiceComponent } from './salon-service/create-salon-service/create-salon-service.component';
import { EditSalonServiceComponent } from './salon-service/edit-salon-service/edit-salon-service.component';
import { ServiceCategoryEditFormComponent } from './service-category/service-category-edit-form/service-category-edit-form.component';
import { SalonServiceEditFormComponent } from './salon-service/salon-service-edit-form/salon-service-edit-form.component';
import {SharedModule} from "../../../../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {DxTreeViewModule} from "devextreme-angular";

const DIALOG_COMPONENTS = [
    CreateServiceCategoryComponent,
    EditServiceCategoryComponent,
    CreateSalonServiceComponent,
    EditSalonServiceComponent,
];

const serviceRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: SettingsServicesComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        RouterModule.forChild(serviceRoutes),
        NgbModalModule.forRoot(),

        DxTreeViewModule,
    ],
    declarations: [
        DIALOG_COMPONENTS,
        SettingsServicesComponent,
        ServiceCategoryEditFormComponent,
        SalonServiceEditFormComponent
    ],
    entryComponents: [
        DIALOG_COMPONENTS
    ]
})
export class SettingsServicesModule {
}
