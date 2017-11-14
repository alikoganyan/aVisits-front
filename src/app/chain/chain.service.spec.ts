import { TestBed, inject } from '@angular/core/testing';

import { ChainService } from './chain.service';
import {BackendService} from "../backend/backend.service";
import {fakeBackendProvider} from "../auth/_helpers/fake-backend";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, HttpModule} from "@angular/http";
import {UserService} from "../auth/_services/user.service";

fdescribe('ChainService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                UserService,
                ChainService,
                BackendService,
                fakeBackendProvider,
                MockBackend,
                BaseRequestOptions
            ]
        });
    });

    it('should be created', inject([ChainService], (service: ChainService) => {
        expect(service).toBeTruthy();
    }));
});
