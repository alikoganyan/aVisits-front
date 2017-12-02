import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Salon} from "../salon.model";

import {EntityCollectionReducer, EntityCollectionState} from "../../entity-collection/entity-collection.reducer";
import {combineReducers} from "@ngrx/store";
import * as fromCollection from "./collection";

export interface State {
    salonEntities: fromCollection.SalonEntityState;
}

export const salonEntityReducer = fromCollection.salonEntityReducer;
export const entityReducer = salonEntityReducer.getReducer();

export const reducers = combineReducers({
    salonEntities: entityReducer,
});

export const getEntitiesState = (state: State) => state.salonEntities;

export const getError = (state: fromCollection.SalonEntityState) => state.error;
export const getCurrentSalon = (state: fromCollection.SalonEntityState) => state.currentEntity;
export const getOperationComplete = (state: fromCollection.SalonEntityState) => state.operationComplete;
export const getLoading = (state: fromCollection.SalonEntityState) => state.loading;
