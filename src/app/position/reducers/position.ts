import {EntityCollectionReducer, EntityCollectionState} from "../../entity-collection/entity-collection.reducer";
import {EmployeePosition} from "../position.model";
import * as collection from '../actions/collection';
import {combineReducers} from "@ngrx/store";

export interface PositionEntityState extends EntityCollectionState<EmployeePosition> {
}

export interface State {
    positionEntities: PositionEntityState
}

class PositionEntityCollectionReducer extends EntityCollectionReducer<EmployeePosition, PositionEntityState> {
}

export const positionEntityReducer = new PositionEntityCollectionReducer(
    collection.collectionActions,
    (position: EmployeePosition) => position.id
);

export const entityReducer = positionEntityReducer.getReducer();

export const reducers = combineReducers({
    positionEntities: entityReducer,
    // state: reducer
});


export const getEntitiesState = (state: State) => state.positionEntities;

export const getError = (state: PositionEntityState) => state.error;
export const getCurrentPosition = (state: PositionEntityState) => state.currentEntity;
export const getOperationComplete = (state: PositionEntityState) => state.operationComplete;
export const getLoading = (state: PositionEntityState) => state.loading;