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
        FormsModule,
        JsonpModule
    ],
    providers: [
        ScriptLoaderService,
        AUTHENTICATION_PROVIDERS,
        UserService,
        ChainService,
        SalonService,
        GeoNamesService,
        { provide: BackendService, useClass: BackendService }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }