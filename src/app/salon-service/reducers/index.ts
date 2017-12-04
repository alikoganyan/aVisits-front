import * as fromCollection from './collection';
import {combineReducers} from "@ngrx/store";

export interface State {
    salonServiceEntities: fromCollection.SalonServiceEntityState
}

export const salonServiceEntityReducer = fromCollection.salonServiceEntityReducer;
export const entityReducer = salonServiceEntityReducer.getReducer();

export const reducers = combineReducers({
    salonServiceEntities: entityReducer
});

export const getEntitiesState = (state: State) => state.salonServiceEntities;

export const getError = (state: fromCollection.SalonServiceEntityState) => state.error;
export const getCurrentSalonService = (state: fromCollection.SalonServiceEntityState) => state.currentEntity;
export const getOperationComplete = (state: fromCollection.SalonServiceEntityState) => state.operationComplete;
export const getLoading = (state: fromCollection.SalonServiceEntityState) => state.loading;
