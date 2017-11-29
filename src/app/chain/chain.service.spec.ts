import { TestBed, inject } from '@angular/core/testing';

import { ChainService } from './chain.service';
import {BackendService} from "../backend/backend.service";
import {fakeBackendProvider} from "../auth/_helpers/fake-backend";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, HttpModule} from "@angular/http";
import {UserService} from "../auth/_services/user.service";
import {AuthenticationService} from "../auth/_services/authentication.service";
import {BackendBaseService} from "../backend/backend-base.service";
import {StoreModule} from "@ngrx/store";

describe('ChainService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                StoreModule.forRoot([])
            ],
            providers: [
                UserService,
                ChainService,
                BackendService,
                fakeBackendProvider,
                MockBackend,
                BackendBaseService,
                BaseRequestOptions,
                AuthenticationService
            ]
        });
    });

    it('should be created', inject([ChainService], (service: ChainService) => {
        expect(service).toBeTruthy();
    }));
});
