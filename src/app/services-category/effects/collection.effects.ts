import {Injectable} from "@angular/core";
import {EntityCollectionEffects} from "../../entity-collection/entity-collection.effects";
import {ServiceCategoryModel} from "../service-category.model";
import {Actions, Effect} from "@ngrx/effects";
import {ServiceCategoryCollectionActions} from "../actions/collection";
import {Observable} from "rxjs/Observable";
import {ServiceCategoryService} from "../service-category.service";

@Injectable()
export class ServiceCategoryEffects extends EntityCollectionEffects<ServiceCategoryModel> {
    fetchEntities(args?: any): Observable<any> {
        return this.serviceCategoryService.getCategories(args);
    }

    addEntity(value: ServiceCategoryModel): Observable<any> {
        return this.serviceCategoryService.createCategory(value);
    }

    updateEntity(value: ServiceCategoryModel): Observable<any> {
        return this.serviceCategoryService.updateCategory(value);
    }

    removeEntity(value: ServiceCategoryModel): Observable<any> {
        return this.serviceCategoryService.deleteCategory(value);
    }

    @Effect()
    loadCategories$ = this.loadEntitiesEffect$;

    @Effect()
    addCategory$ = this.addEntityEffect$;

    @Effect()
    updateCategory$ = this.updateEntityEffect$;

    @Effect()
    deleteCategory$ = this.removeEntityEffect$;

    constructor(
        protected serviceCategoryService: ServiceCategoryService,
        protected actions$: Actions,
        protected collectionActions: ServiceCategoryCollectionActions)
    {
        super(actions$, collectionActions)
    }
}