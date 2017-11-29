import { TestBed, inject } from '@angular/core/testing';

import { BackendService } from './backend.service';
import {fakeBackendProvider} from "../auth/_helpers/fake-backend";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, HttpModule} from "@angular/http";
import {UserService} from "../auth/_services/user.service";
import {AuthenticationService} from "../auth/_services/authentication.service";
import {BackendBaseService} from "./backend-base.service";
import {StoreModule} from "@ngrx/store";

describe('BackendService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                StoreModule.forRoot([])
            ],
            providers: [
                UserService,
                BackendService,
                fakeBackendProvider,
                MockBackend,
                BaseRequestOptions,
                AuthenticationService,
                BackendService,
                BackendBaseService,
            ]
        });
    });

    it('should be created', inject([BackendService], (service: BackendService) => {
        expect(service).toBeTruthy();
    }));
});
