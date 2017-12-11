import { Injectable } from '@angular/core';
import { Chain } from "./chain.model";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";
import { BackendService } from "../backend/backend.service";
import {Utils} from "../shared/utils";

@Injectable()
export class ChainService {

    constructor(
        private backend: BackendService
    ) { }

    getChains(): Observable<any> {
        return this.backend.get('chain')
            .map(res => res.json().data);
    }

    getChainById(id: string): Observable<any> {
        return this.getChains()
            .map(chains => chains.filter(c => c.id == id)[0]);
    }

    createChain(chain: Chain): Observable<Chain> {
        let data = Utils.transformImgOnSave(chain);
        return this.backend.post('chain', chain)
            .map(res => res.json().data.chain);
    }

    updateChain(chain: Chain): Observable<any> {
        let data = Utils.transformImgOnSave(chain);
        return this.backend.put('chain', data)
            .map(res => res.json().data.chain);
    }

    deleteChain(chain: Chain): Observable<any> {
        return this.backend.delete('chain/' + chain.id);
    }

}
