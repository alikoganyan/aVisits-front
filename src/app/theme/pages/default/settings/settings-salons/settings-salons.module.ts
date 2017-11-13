import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsSalonsComponent } from './settings-salons.component';
import { SalonRowComponent } from './salon-row/salon-row.component';
import { RouterModule, Routes } from "@angular/router";
import { CreateSalonComponent } from './create-salon/create-salon.component';
import { SalonEditFormComponent } from './salon-edit-form/salon-edit-form.component';
import { EditSalonComponent } from './edit-salon/edit-salon.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng4GeoautocompleteModule } from "ng4-geoautocomplete";
import { AgmCoreModule } from "@agm/core";
import { DxAutocompleteModule, DxDateBoxModule, DxMapModule } from "devextreme-angular";
import { SalonScheduleDayComponent } from './salon-edit-form/salon-schedule-day/salon-schedule-day.component';

const salonRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: SettingsSalonsComponent
            },
            {
                path: 'create',
                component: CreateSalonComponent
            },
            {
                path: 'edit/:id',
                component: EditSalonComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(salonRoutes),
        FormsModule,
        ReactiveFormsModule,

        DxAutocompleteModule,
        DxDateBoxModule,

        // Ng4GeoautocompleteModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDBGVDv5fOFgfW4ixNZL_2krgkriGu6vvc',
            libraries: ['places']
        }),
    ],
    declarations: [
        SettingsSalonsComponent,
        SalonRowComponent,
        CreateSalonComponent,
        SalonEditFormComponent,
        EditSalonComponent,
        SalonScheduleDayComponent
    ]
})
export class SettingsSalonsModule {
}