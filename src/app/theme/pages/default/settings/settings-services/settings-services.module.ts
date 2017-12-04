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
        RouterModule.forChild(serviceRoutes),
    ],
    declarations: [SettingsServicesComponent, CreateServiceCategoryComponent, EditServiceCategoryComponent, CreateSalonServiceComponent, EditSalonServiceComponent, ServiceCategoryEditFormComponent, SalonServiceEditFormComponent]
})
export class SettingsServicesModule {
}
