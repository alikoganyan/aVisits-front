import {Injectable} from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {Observable} from "rxjs/Observable";
import {SalonServiceModel} from "./salon-service.model";

@Injectable()
export class SalonService_Service {

    constructor(private backend: BackendService) {
    }

    get(chainId: number): Observable<any> {
        return this.backend.get(``);
    }

    create(value: SalonServiceModel): Observable<any> {
        return this.backend.post(``, value);
    }

    update(value: SalonServiceModel): Observable<any> {
        return this.backend.put(``, value);
    }

    delete(value: SalonServiceModel): Observable<any> {
        return this.backend.delete(``);
    }
}
