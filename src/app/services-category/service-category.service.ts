import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ServiceCategoryModel} from "./service-category.model";
import {BackendService} from "../backend/backend.service";

@Injectable()
export class ServiceCategoryService {

    constructor(private backend: BackendService) {
    }


    getCategories(chainId: any): Observable<any> {
        return this.backend.get(`${chainId}/service_category`)
            .map(res => res.json().data);
    }

    createCategory(value: ServiceCategoryModel): Observable<any> {
        return this.backend.post(`${value.chain_id}/service_category`, value);
    }

    updateCategory(value: ServiceCategoryModel): Observable<any> {
        return this.backend.put(`${value.chain_id}/service_category/${value.id}`, value);
    }

    deleteCategory(value: ServiceCategoryModel): Observable<any> {
        return this.backend.delete(`${value.chain_id}/service_category/${value.id}`);
    }

}
