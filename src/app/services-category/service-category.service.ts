import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ServiceCategoryModel} from "./service-category.model";
import {BackendService} from "../backend/backend.service";

@Injectable()
export class ServiceCategoryService {

    constructor(private backend: BackendService) {
    }


    getCategories(chainId: any): Observable<any> {
        return this.backend.get(``)
            .map(res => res.json().data);
    }

    createCategory(value: ServiceCategoryModel): Observable<any> {
        return this.backend.post(``, value);
    }

    updateCategory(value: ServiceCategoryModel): Observable<any> {
        return this.backend.put(``, value);
    }

    deleteCategory(value: ServiceCategoryModel): Observable<any> {
        return this.backend.delete(``);
    }

}
