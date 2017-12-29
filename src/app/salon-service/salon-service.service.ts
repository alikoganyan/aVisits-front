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
            .map(res => res.json().data.services);
    }

    create(value: SalonServiceModel): Observable<any> {
        return this.backend.post(`${value.chain_id}/service`, value)
            .map(res => res.json().data.service);
    }

    update(value: SalonServiceModel): Observable<any> {
        return this.backend.put(`${value.chain_id}/service/${value.id}`, value)
            .map(res => res.json().data.service);
    }

    delete(value: SalonServiceModel): Observable<any> {
        return this.backend.delete(`${value.chain_id}/service/${value.id}`);
    }

    setNewPrices(newPrices: any): Observable<any> {
        return this.backend.post(`${newPrices.chain_id}/service_price`, newPrices);
    }
}
