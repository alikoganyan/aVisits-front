import {EntityCollectionActions} from "../../entity-collection/entity-collection.actions";
import {ServiceCategoryModel} from "../service-category.model";

export class ServiceCategoryCollectionActions extends EntityCollectionActions<ServiceCategoryModel> {
    protected get entityName(): string {
        return 'Service Category';
    }

    constructor() {
        super();
    }
}

export const collectionActions = new ServiceCategoryCollectionActions();