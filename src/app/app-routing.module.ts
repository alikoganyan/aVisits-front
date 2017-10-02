import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LogoutComponent} from "./auth/logout/logout.component";
import { CreateSalonComponent } from "./auth/create-salon/create-salon.component";
import {AuthGuard} from "./auth/_guards/auth.guard";

const routes: Routes = [
    {path: 'login', loadChildren: './auth/auth.module#AuthModule'},
    {path: 'create-salon', canActivate: [AuthGuard], component: CreateSalonComponent},
    {path: 'logout', component: LogoutComponent},
    {path: '', redirectTo: 'index', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}