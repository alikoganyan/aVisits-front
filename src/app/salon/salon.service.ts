import { Injectable } from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {Observable} from "rxjs/Observable";
import {Chain} from "../chain/chain.model";
import {ChainService} from "../chain/chain.service";
import {Salon} from "./salon.model";

@Injectable()
export class SalonService {

    constructor(
        private backend: BackendService,
        private chainService: ChainService
    ) { }

    getSalons(): Observable<any> {
        return this.chainService
            .getChains()
            .map(chains => {
                return chains.reduce((acc, item) => {
                    return acc.concat(item.salons);
                }, []);
            });

    }

    getSalonById(id): Observable<any> {
        return this.getSalons()
            .map(salons => salons.filter(s => s.id == id)[0]);
    }

    getSalonsForChain(chain: Chain): Observable<any> {
        return this.backend.get(`${chain.id}/salon`);
    }

    createSalon(salon: Salon): Observable<any> {
        return this.backend.post(`${salon.chain_id}/salon`, salon)
    }

    updateSalon(salon: Salon): Observable<any> {
        return this.backend.put(`${salon.chain_id}/salon`, salon)
    }

    delete(salon: Salon): Observable<any> {
        return this.backend.delete(`${salon.chain_id}/salon/${salon.id}`);
    }

}
