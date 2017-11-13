import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";
import { DefaultComponent } from "./pages/default/default.component";

const routes: Routes = [
    {
        path: "",
        "component": ThemeComponent,
        "canActivate": [AuthGuard],
        "children": [
            {
                path: "index",
                loadChildren: ".\/pages\/default\/index\/index.module#IndexModule"
            },
            {
                path: "settings",
                component: DefaultComponent,
                loadChildren: ".\/pages\/default\/settings\/settings.module#SettingsModule"
            },
            {
                path: "404",
                loadChildren: ".\/pages\/default\/not-found\/not-found\/not-found.module#NotFoundModule"
            },
            {
                path: "",
                "redirectTo": "index",
                "pathMatch": "full"
            }
        ]
    },
    {
        path: "**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }