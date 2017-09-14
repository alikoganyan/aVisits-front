import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';

/* Schedule */
import { DxSchedulerModule, DxTemplateModule  } from 'devextreme-angular';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": IndexComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes),
        LayoutModule,
        DxSchedulerModule,
        DxTemplateModule
    ], exports: [
        RouterModule
    ], declarations: [
        IndexComponent
    ]
})
export class IndexModule {



}