import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { FooterComponent } from './footer/footer.component';
import { QuickSidebarComponent } from './quick-sidebar/quick-sidebar.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HrefPreventDefaultDirective } from '../_directives/href-prevent-default.directive';
import { UnwrapTagDirective } from '../_directives/unwrap-tag.directive';
import {NavTitleService} from "./header-nav/nav-title.service";
import { SalonFilterDropdownComponent } from './aside-nav/salon-filter-dropdown/salon-filter-dropdown.component';
import {DxSelectBoxModule, DxTextBoxModule} from "devextreme-angular";

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderNavComponent,
        DefaultComponent,
        AsideNavComponent,
        FooterComponent,
        QuickSidebarComponent,
        ScrollTopComponent,
        TooltipsComponent,
        HrefPreventDefaultDirective,
        UnwrapTagDirective,
        SalonFilterDropdownComponent,
    ],
    exports: [
        LayoutComponent,
        HeaderNavComponent,
        DefaultComponent,
        AsideNavComponent,
        FooterComponent,
        QuickSidebarComponent,
        ScrollTopComponent,
        TooltipsComponent,
        HrefPreventDefaultDirective,
    ],
    providers: [
        NavTitleService
    ],
    imports: [
        CommonModule,
        RouterModule,
        DxSelectBoxModule,
        DxTextBoxModule,
    ]
})
export class LayoutModule {
}