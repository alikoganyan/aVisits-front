import {Injectable} from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {EmployeePosition} from "./position.model";

@Injectable()
export class EmployeePositionService {

    constructor(private backend: BackendService) {
    }


    getPositions(chain_id: number): Observable<any> {
        return this.backend.get(`${chain_id}/position`)
            .map(response => response.json().data.positions)
    }
    
    createPosition(position: EmployeePosition): Observable<any> {
        return this.backend.post(`${position.chain_id}/position`, position)
            .map(res => res.json().data.position);
    }

    updatePosition(position: EmployeePosition): Observable<any> {
        return this.backend.put(`${position.chain_id}/position/${position.id}`, position)
            .map(res => res.json().data);
    }

    delete(position: EmployeePosition): Observable<any> {
        return this.backend.delete(`${position.chain_id}/position/${position.id}`);
    }

}
