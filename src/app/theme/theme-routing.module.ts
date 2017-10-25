import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";
import { CreateSalonGuardService } from "../auth/_guards/create-salon-guard.service";

const routes: Routes = [
    {
        "path": "",
        "component": ThemeComponent,
        "canActivate": [AuthGuard, CreateSalonGuardService],
        "children": [
            {
                "path": "index",
                "loadChildren": ".\/pages\/default\/index\/index.module#IndexModule"
            },
            {
                "path": "components\/salons\/all-salons",
                "loadChildren": ".\/pages\/default\/components\/salons\/all-salons\/all-salons.module#AllSalonsModule"
            },
            {
                "path": "components\/salons\/create-new-salon",
                "loadChildren": ".\/pages\/default\/components\/salons\/create-new-salon\/create-new-salon.module#CreateNewSalonModule"
            },
            {
                "path": "components\/salons\/edit-salon\/:id",
                "loadChildren": ".\/pages\/default\/components\/salons\/edit-salon\/edit-salon.module#EditSalonModule"
            },
            {
                "path": "components\/records\/record-view-table",
                "loadChildren": ".\/pages\/default\/components\/records\/record-view-table\/record-view-table.module#RecordViewTableModule"
            },
            {
                "path": "components\/records\/record-form",
                "loadChildren": ".\/pages\/default\/components\/records\/record-form\/record-form.module#RecordFormModule"
            },
            {
                "path": "components\/accounts",
                "loadChildren": ".\/pages\/default\/components\/accounts\/accounts.module#AccountsModule"
            },
            {
                "path": "components\/schedule\/main-schedule",
                "loadChildren": ".\/pages\/default\/components\/schedule\/main-schedule\/main-schedule.module#MainScheduleModule"
            },
            {
                "path": "components\/schedule\/form-editing",
                "loadChildren": ".\/pages\/default\/components\/schedule\/form-editing\/form-editing.module#FormEditingModule"
            },
            {
                "path": "components\/schedule\/autocomplete-form",
                "loadChildren": ".\/pages\/default\/components\/schedule\/autocomplete-form\/autocomplete-form.module#AutocompleteFormModule"
            },
            {
                "path": "components\/employees\/employees-main",
                "loadChildren": ".\/pages\/default\/components\/employees\/employees-main\/employees-main.module#EmployeesMainModule"
            },
            {
                "path": "components\/employees\/employee",
                "loadChildren": ".\/pages\/default\/components\/employees\/employee\/employee.module#EmployeeModule"
            },
            {
                "path": "components\/employees\/edit-employee\/:id",
                "loadChildren": ".\/pages\/default\/components\/employees\/edit-employee\/edit-employee.module#EditEmployeeModule"
            },
            {
                "path": "components\/customers",
                "loadChildren": ".\/pages\/default\/components\/customers\/customers.module#CustomersModule"
            },
            {
                "path": "components\/services",
                "loadChildren": ".\/pages\/default\/components\/services\/services.module#ServicesModule"
            },
            {
                "path": "components\/employee-position",
                "loadChildren": ".\/pages\/default\/components\/employee-position\/employee-position.module#EmployeePositionModule"
            },
            {
                "path": "components\/service",
                "loadChildren": ".\/pages\/default\/components\/services\/service\/service.module#ServiceModule"
            },
            {
                "path": "components\/products",
                "loadChildren": ".\/pages\/default\/components\/products\/products.module#ProductsModule"
            },
            {
                "path": "components\/chains",
                "loadChildren": ".\/pages\/default\/components\/chains\/chains.module#ChainsModule"
            },
           /* {
                "path": "components\/create-chain",
                "loadChildren": ".\/pages\/default\/components\/chains\/create-chain\/create-chain.module#CreateChainModule"
            },*/
            {
                "path": "components\/salary",
                "loadChildren": ".\/pages\/default\/components\/salary\/salary.module#SalaryModule"
            },
            {
                "path": "components\/wage",
                "loadChildren": ".\/pages\/default\/components\/wage\/wage.module#WageModule"
            },
            {
                "path": "components\/cashier",
                "loadChildren": ".\/pages\/default\/components\/cashier\/cashier.module#CashierModule"
            },
            {
                "path": "components\/tasks",
                "loadChildren": ".\/pages\/default\/components\/tasks\/tasks.module#TasksModule"
            },
            {
                "path": "components\/reports",
                "loadChildren": ".\/pages\/default\/components\/reports\/reports.module#ReportsModule"
            },
            {
                "path": "components\/stuff",
                "loadChildren": ".\/pages\/default\/components\/stuff\/stuff.module#StuffModule"
            },
            {
                "path": "header\/actions",
                "loadChildren": ".\/pages\/default\/header\/header-actions\/header-actions.module#HeaderActionsModule"
            },
            {
                "path": "header\/profile",
                "loadChildren": ".\/pages\/default\/header\/header-profile\/header-profile.module#HeaderProfileModule"
            },
            {
                "path": "404",
                "loadChildren": ".\/pages\/default\/not-found\/not-found\/not-found.module#NotFoundModule"
            },
            {
                "path": "",
                "redirectTo": "index",
                "pathMatch": "full"
            }
        ]
    },
    {
        "path": "snippets\/pages\/user\/login-1",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/user\/user-login-1\/user-login-1.module#UserLogin1Module"
    },
    {
        "path": "snippets\/pages\/user\/login-2",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/user\/user-login-2\/user-login-2.module#UserLogin2Module"
    },
    {
        "path": "snippets\/pages\/user\/login-3",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/user\/user-login-3\/user-login-3.module#UserLogin3Module"
    },
    {
        "path": "snippets\/pages\/user\/login-4",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/user\/user-login-4\/user-login-4.module#UserLogin4Module"
    },
    {
        "path": "snippets\/pages\/user\/login-5",
        "loadChildren": ".\/pages\/self-layout-blank\/snippets\/pages\/user\/user-login-5\/user-login-5.module#UserLogin5Module"
    },
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }