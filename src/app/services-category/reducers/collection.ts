import {EntityCollectionReducer, EntityCollectionState} from "../../entity-collection/entity-collection.reducer";
import {ServiceCategoryModel} from "../service-category.model";
import * as collection from '../actions/collection';

export interface ServiceCategoryEntityState extends EntityCollectionState<ServiceCategoryModel> {}

class ServiceCategoryCollectionReducer
    extends EntityCollectionReducer<ServiceCategoryModel, ServiceCategoryEntityState> {}

export const serviceCategoryEntityReducer = new ServiceCategoryCollectionReducer(
    collection.collectionActions,
    (category: ServiceCategoryModel) => category.id
);