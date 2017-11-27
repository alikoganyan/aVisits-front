import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsSalonsComponent } from './settings-salons.component';
import { SalonRowComponent } from './salon-row/salon-row.component';
import { RouterModule, Routes } from "@angular/router";
import { CreateSalonComponent } from './create-salon/create-salon.component';
import { SalonEditFormComponent } from './salon-edit-form/salon-edit-form.component';
import { EditSalonComponent } from './edit-salon/edit-salon.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {AgmCoreModule, GoogleMapsAPIWrapper} from "@agm/core";
import {
    DxAutocompleteModule, DxDateBoxModule, DxDropDownBoxModule, DxPopupModule, DxSelectBoxModule,
    DxTagBoxModule
} from "devextreme-angular";
import { SalonScheduleDayComponent } from './salon-edit-form/salon-schedule-day/salon-schedule-day.component';
import {SharedModule} from "../../../../../shared/shared.module";
import { DayOfWeekPipe } from './salon-edit-form/salon-schedule-day/day-of-week.pipe';
import { TimeToJsDatePipe } from './salon-edit-form/salon-schedule-day/time-to-js-date.pipe';
import { JsDateToTimeStringPipe } from './salon-edit-form/salon-schedule-day/js-date-to-time-string.pipe';
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {ModalService} from "../../../../../shared/modal.service";
import {StoreModule} from "@ngrx/store";
// import {reducers} from "../../../../../salon/reducers/index";
import {EffectsModule} from "@ngrx/effects";
import {SalonEffects} from "../../../../../salon/effects/salon.effects";
import {SalonCollectionEffects} from "../../../../../salon/effects/collection.effects";

const salonRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: SettingsSalonsComponent
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
        SharedModule,
        // StoreModule.forFeature('salons', reducers),
        // EffectsModule.forFeature([SalonEffects, SalonCollectionEffects]),

        DxAutocompleteModule,
        DxDateBoxModule,
        DxSelectBoxModule,
        DxTagBoxModule,
        DxDropDownBoxModule,

        // NgbModalModule.forRoot(),
        AgmCoreModule.forRoot(),
    ],
    declarations: [
        SettingsSalonsComponent,
        SalonRowComponent,
        CreateSalonComponent,
        SalonEditFormComponent,
        EditSalonComponent,
        SalonScheduleDayComponent,
        DayOfWeekPipe,
        TimeToJsDatePipe,
        JsDateToTimeStringPipe
    ],
    providers: [
        JsDateToTimeStringPipe,
        GoogleMapsAPIWrapper,
        // ModalService
    ],
    entryComponents: [
        CreateSalonComponent,
        EditSalonComponent
    ]
})
export class SettingsSalonsModule {
}
