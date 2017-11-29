// import * as chain from '../actions/chain';
import * as collection from '../actions/collection';
import {EntitySelectors} from "@ngrx/entity/src/models";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Chain} from "../chain.model";
import {
    CollectionActions,
} from "../../entity-collection/entity-collection.actions";
import {combineReducers} from "@ngrx/store";
import {EntityCollectionReducer, EntityCollectionState} from "../../entity-collection/entity-collection.reducer";

export interface ChainEntityState extends EntityCollectionState<Chain> {
}

// export interface ChainState {
    //some additional data
// }

export interface State {
    chainEntities: ChainEntityState,
    // state: ChainState
}


class ChainEntityCollectionReducer extends EntityCollectionReducer<Chain, ChainEntityState> {}

export const chainEntityReducer = new ChainEntityCollectionReducer(
    collection.collectionActions,
    (chain: Chain) => chain.id
    );

export const entityReducer = chainEntityReducer.getReducer();


export const reducers = combineReducers({
    chainEntities: entityReducer,
    // state: reducer
});


export const getEntitiesState = (state: State) => state.chainEntities;

export const getError = (state: ChainEntityState) => state.error;
export const getCurrentChain = (state: ChainEntityState) => state.currentEntity;
export const getOperationComplete = (state: ChainEntityState) => state.operationComplete;
export const getLoading = (state: ChainEntityState) => state.loading;