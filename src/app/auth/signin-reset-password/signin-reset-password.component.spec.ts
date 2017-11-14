import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninResetPasswordComponent } from './signin-reset-password.component';
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../_services/authentication.service";
import {BackendService} from "../../backend/backend.service";
import {HttpModule} from "@angular/http";
import {UserService} from "../_services/user.service";

xdescribe('SigninResetPasswordComponent', () => {
    let component: SigninResetPasswordComponent;
    let fixture: ComponentFixture<SigninResetPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpModule],
            declarations: [SigninResetPasswordComponent],
            providers: [
                AuthenticationService,
                BackendService,
                UserService,

            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SigninResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
