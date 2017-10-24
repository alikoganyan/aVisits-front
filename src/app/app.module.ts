import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';

/* JsonP */
import { JsonpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { ScriptLoaderService } from "./_services/script-loader.service";
import { ThemeRoutingModule } from "./theme/theme-routing.module";
import { AuthModule } from "./auth/auth.module";
import { GlobalErrorHandler } from "./_services/error-handler.service";
/* Service */
import { GetCityService } from "./_services/get-city.service";
import { CreateEmployeePositionService } from "./theme/_services/create-employee-position.service";
import { CreateSalonService } from "./theme/_services/create-salon.service";
import { EmployeeService } from "./theme/_services/employee.service";






@NgModule({
    declarations: [
        ThemeComponent,
        AppComponent
    ],
    imports: [
        LayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ThemeRoutingModule,
        AuthModule,
        JsonpModule
    ],
    providers: [
        ScriptLoaderService,
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        GetCityService,
        CreateEmployeePositionService,
        CreateSalonService,
        EmployeeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
