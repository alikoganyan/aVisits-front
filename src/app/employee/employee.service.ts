import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BackendService} from "../backend/backend.service";

@Injectable()
export class EmployeeService {

    constructor(private backend: BackendService) {
    }

    getById(args: any): Observable<any> {
        return this.backend.get(`${args.chain_id}/salon/${args.salon_id}/employee/${args.id}`)
            .map(res => res.json().data)
            .map(data => ({
                ...data,
                chain_id: args.chain_id,
                salon_id: args.salon_id
            }));
    }

    getAllByChain(chainId): Observable<any> {
        return this.backend.get(`${chainId}/employee`)
            .map(res => res.json().data)
            .map(data => data.map(e => ({...e, chain_id: chainId})));
    }

    create(value: any): Observable<any> {
        return this.backend.post(`${value.chain_id}/salon/${value.salon_id}/employee`, value)
            .map(res => res.json().data.employee);
    }

    update(value: any): Observable<any> {
        return this.backend.put(`${value.chain_id}/salon/${value.salon_id}/employee/${value.id}`, value)
            .map(res => res.json().data.employee);
    }

    delete(value: any): Observable<any> {
        return this.backend.delete(`${value.chain_id}/employee/${value.id}`);
    }

}
