import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Salon} from "../salon.model";
import * as collection from '../actions/collection';
import {EntityCollectionReducer, EntityCollectionState} from "../../entity-collection/entity-collection.reducer";
import {combineReducers} from "@ngrx/store";

export interface SalonEntityState extends EntityCollectionState<Salon> {}

export interface State {
    salonEntities: SalonEntityState;
}

class SalonEntityCollectionReducer extends EntityCollectionReducer<Salon, SalonEntityState> {}

export const salonEntityReducer = new SalonEntityCollectionReducer(
    collection.collectionActions,
    (salon: Salon) => salon.id
);

export const entityReducer = salonEntityReducer.getReducer();

export const reducers = combineReducers({
    salonEntities: entityReducer
});

export const getEntitiesState = (state: State) => state.salonEntities;

export const getError = (state: SalonEntityState) => state.error;
export const getCurrentSalon = (state: SalonEntityState) => state.currentEntity;
export const getOperationComplete = (state: SalonEntityState) => state.operationComplete;
export const getLoading = (state: SalonEntityState) => state.loading;

