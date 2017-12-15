import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BackendService} from "../backend/backend.service";

@Injectable()
export class EmployeeService {

    constructor(private backend: BackendService) {
    }

    getAllByChain(chainId): Observable<any> {
        return this.backend.get(`${chainId}/employee`)
            .map(res => res.json().data);
    }

    create(value: any): Observable<any> {
        return this.backend.post(`${value.chain_id}/employee`, value)
            .map(res => res.json().data);
    }

    update(value: any): Observable<any> {
        return this.backend.put(`${value.chain_id}/employee/${value.id}`, value)
            .map(res => res.json().data);
    }

    delete(value: any): Observable<any> {
        return this.backend.delete(`${value.chain_id}/employee/${value.id}`);
    }

}
