import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SigninEnterPasswordComponent } from './signin-enter-password.component';
import {FormsModule} from "@angular/forms";
import {BaseRequestOptions, HttpModule} from "@angular/http";
import {AuthenticationService} from "../_services/authentication.service";
import {BackendService} from "../../backend/backend.service";
import {UserService} from "../_services/user.service";
import {AlertService} from "../_services/alert.service";
import {fakeBackendProvider} from "../_helpers/fake-backend";
import {MockBackend} from "@angular/http/testing";

xdescribe('SigninEnterPasswordComponent', () => {
    let component: SigninEnterPasswordComponent;
    let fixture: ComponentFixture<SigninEnterPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule, HttpModule],
            declarations: [SigninEnterPasswordComponent],
            providers: [
                AuthenticationService,
                BackendService,
                UserService,
                AlertService,
                fakeBackendProvider,
                MockBackend,
                BaseRequestOptions
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SigninEnterPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
