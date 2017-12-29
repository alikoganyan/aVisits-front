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
import {DefaultPageModule} from "./theme/pages/default/default-page.module";
import { DevExtremeModule } from 'devextreme-angular';
import { locale, loadMessages } from 'devextreme/localization';
import 'devextreme-intl';
import {FilterEffects} from "./filter/effects/filter";

declare var require: any;

let messagesRu = require("devextreme/localization/messages/ru.json");
loadMessages(messagesRu);
locale("ru");

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
        EffectsModule.forRoot([FilterEffects]),
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