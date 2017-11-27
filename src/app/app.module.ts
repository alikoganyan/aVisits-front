import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './shared/layouts/layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from "./shared/_services/script-loader.service";
import { ThemeRoutingModule } from "./theme/theme-routing.module";
import { AuthModule } from "./auth/auth.module";
import { ChainService } from "./chain/chain.service";
import { FormsModule } from "@angular/forms";
import { AUTHENTICATION_PROVIDERS, AuthenticationService } from "./auth/_services/authentication.service";
import { BackendService } from "./backend/backend.service";
import { SalonService } from "./salon/salon.service";
import { GeoNamesService } from "./shared/_services/geo-names.service";
import { JsonpModule } from "@angular/http";
import {UserService} from "./auth/_services/user.service";
import {BackendBaseService} from "./backend/backend-base.service";
import {StoreModule} from "@ngrx/store";
import {RouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {EffectsModule} from "@ngrx/effects";
import {metaReducers, reducers} from "./reducers/index";
import {environment} from "../environments/environment";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {CustomRouterStateSerializer} from "./shared/router.utils";
// import {LayoutEffects} from "./shared/effects/layout.effects";
import {ModalService} from "./shared/modal.service";
import {NgbActiveModal, NgbModal, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {NgbModalBackdrop} from "@ng-bootstrap/ng-bootstrap/modal/modal-backdrop";
import {DefaultPageModule} from "./theme/pages/default/default-page.module";

@NgModule({
    declarations: [
        ThemeComponent,
        AppComponent,
    ],
    imports: [
        LayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ThemeRoutingModule,
        AuthModule,
        DefaultPageModule,
        FormsModule,
        JsonpModule,

        StoreModule.forRoot(reducers, {metaReducers}),
        StoreRouterConnectingModule,
        EffectsModule.forRoot([/*LayoutEffects*/]),
        StoreDevtoolsModule.instrument(),
    ],
    providers: [
        ScriptLoaderService,
        AUTHENTICATION_PROVIDERS,
        UserService,
        ChainService,

        BackendBaseService,

        { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }