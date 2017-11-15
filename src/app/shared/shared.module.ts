import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicComponent} from "./dynamic/dynamic.component";

@NgModule({
    imports: [
        CommonModule
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
