import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicComponent} from "./dynamic/dynamic.component";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {ModalService} from "./modal.service";

@NgModule({
    imports: [
        CommonModule,
        NgbModalModule.forRoot(),
    ],
    exports: [
        DynamicComponent
    ],
    declarations: [
        DynamicComponent
    ],
    providers: [
        ModalService
    ],
})
export class SharedModule {
}
