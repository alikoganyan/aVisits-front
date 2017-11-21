import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicComponent} from "./dynamic/dynamic.component";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        NgbModalModule
    ],
    exports: [
        DynamicComponent
    ],
    declarations: [
        DynamicComponent
    ]
})
export class SharedModule {
}
