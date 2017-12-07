import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicComponent} from "./dynamic/dynamic.component";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {ModalService} from "./modal.service";
import { FilterByChainComponent } from './filter-by-chain/filter-by-chain.component';
import {DxSelectBoxModule} from "devextreme-angular";
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { ImageSrcPipe } from './pipes/image-src.pipe';

@NgModule({
    imports: [
        CommonModule,
        NgbModalModule.forRoot(),
        DxSelectBoxModule,
    ],
    exports: [
        DynamicComponent,
        FilterByChainComponent,
        DialogFooterComponent,
        ImageSrcPipe,
    ],
    declarations: [
        DynamicComponent,
        FilterByChainComponent,
        DialogHeaderComponent,
        DialogFooterComponent,
        ImageSrcPipe,
    ],
    providers: [
        ModalService
    ],
})
export class SharedModule {
}
