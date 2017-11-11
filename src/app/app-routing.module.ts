import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from "./auth/logout/logout.component";
import { AuthGuard } from "./auth/_guards/auth.guard";
import { AuthComponent } from "./auth/auth.component";
import {SignupComponent} from "./auth/signup/signup.component";

const routes: Routes = [
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'logout', component: LogoutComponent },
    { path: '', redirectTo: 'index', pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        enableTracing: true
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }