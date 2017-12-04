import * as collection from './collection';
import {combineReducers} from "@ngrx/store";

export interface State {
    serviceCategoryEntities: collection.ServiceCategoryEntityState;
}

export const serviceCategoryEntityReducer = collection.serviceCategoryEntityReducer;
export const entityReducer = serviceCategoryEntityReducer.getReducer();

export const reducers = combineReducers({
    serviceCategoryEntities: entityReducer
});

export const getEntitiesState = (state: State) => state.serviceCategoryEntities;

export const getError = (state: collection.ServiceCategoryEntityState) => state.error;
export const getCurrentServiceCategory = (state: collection.ServiceCategoryEntityState) => state.currentEntity;
export const getOperationComplete = (state: collection.ServiceCategoryEntityState) => state.operationComplete;
export const getLoading = (state: collection.ServiceCategoryEntityState) => state.loading;
