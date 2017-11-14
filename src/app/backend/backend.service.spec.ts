import { TestBed, inject } from '@angular/core/testing';

import { BackendService } from './backend.service';
import {fakeBackendProvider} from "../auth/_helpers/fake-backend";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, HttpModule} from "@angular/http";
import {UserService} from "../auth/_services/user.service";

fdescribe('BackendService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                UserService,
                BackendService,
                fakeBackendProvider,
                MockBackend,
                BaseRequestOptions
            ]
        });
    });

    it('should be created', inject([BackendService], (service: BackendService) => {
        expect(service).toBeTruthy();
    }));
});
