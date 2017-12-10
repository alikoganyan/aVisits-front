import {Injectable} from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {Observable} from "rxjs/Observable";
import {SalonServiceModel} from "./salon-service.model";

@Injectable()
export class SalonService_Service {

    constructor(private backend: BackendService) {
    }

    get(chainId: number): Observable<any> {
        return this.backend.get(`${chainId}/service`)
            .map(res => res.json().data);
    }

    create(value: SalonServiceModel): Observable<any> {
        return this.backend.post(`${value.chain_id}/service`, value);
    }

    update(value: SalonServiceModel): Observable<any> {
        return this.backend.put(``, value);
    }

    delete(value: SalonServiceModel): Observable<any> {
        return this.backend.delete(``);
    }

    setNewPrices(newPrices: any): Observable<any> {
        return this.backend.post(`${newPrices.chain_id}/service_price`, newPrices);
    }
}
