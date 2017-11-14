import { TestBed, async, inject } from '@angular/core/testing';

import { SigninEnterPasswordGuard } from './signin-enter-password.guard';
import {RouterTestingModule} from "@angular/router/testing";
import {AuthenticationService} from "../_services/authentication.service";
import {BackendService} from "../../backend/backend.service";
import {UserService} from "../_services/user.service";
import {fakeBackendProvider} from "../_helpers/fake-backend";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, HttpModule} from "@angular/http";

fdescribe('SigninEnterPasswordGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpModule
            ],
            providers: [
                SigninEnterPasswordGuard,
                AuthenticationService,
                BackendService,
                UserService,
                fakeBackendProvider,
                MockBackend,
                BaseRequestOptions
            ]
        });
    });

    it('should ...', inject([SigninEnterPasswordGuard], (guard: SigninEnterPasswordGuard) => {
        expect(guard).toBeTruthy();
    }));
});
