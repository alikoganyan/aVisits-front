import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthenticationService} from "../_services/authentication.service";
import {BackendService} from "../../backend/backend.service";
import {UserService} from "../_services/user.service";
import {BaseRequestOptions, HttpModule} from "@angular/http";
import {fakeBackendProvider} from "../_helpers/fake-backend";
import {MockBackend} from "@angular/http/testing";
import {AlertService} from "../_services/alert.service";

describe('SigninComponent', () => {
    let component: SigninComponent;
    let fixture: ComponentFixture<SigninComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule, HttpModule],
            declarations: [SigninComponent],
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
        fixture = TestBed.createComponent(SigninComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
