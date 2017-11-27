// import * as chain from '../actions/chain';
import * as collection from '../actions/collection';
import {EntitySelectors} from "@ngrx/entity/src/models";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Chain} from "../chain.model";

export interface State extends EntityState<Chain> {
    currentChain: Chain | null;
    loading: boolean;
    operationSuccessful: boolean;
    error: string | null;
}

export const adapter: EntityAdapter<Chain> = createEntityAdapter<Chain>({
    selectId: (chain: Chain) => chain.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    currentChain: null,
    loading: false,
    operationSuccessful: false,
    error: null
});

export function reducer(state = initialState, action: collection.Actions): State {

    switch (action.type) {
        case collection.SET_CURRENT_CHAIN: {
            return {
                ...state,
                currentChain: action.payload
            }
        }

        case collection.LOAD_ALL_SUCCESS: {
            return adapter.addAll(action.payload, state);
        }

        case collection.ADD_CHAIN:
        case collection.UPDATE_CHAIN: {
            return {
                ...state,
                operationSuccessful: false
            };
        }

        case collection.ADD_CHAIN_SUCCESS: {
            return {
                ...adapter.addOne(action.payload, state),
                operationSuccessful: true
            };
        }

        case collection.ADD_CHAIN_FAILURE: {
            return {
                ...state,
                error: action.payload
            };
        }

        case collection.UPDATE_CHAIN_SUCCESS: {
            return {
                ...adapter.updateOne({
                    id: action.payload.id,
                    changes: action.payload
                }, state),
                operationSuccessful: true
            };
        }

        case collection.REMOVE_CHAIN_SUCCESS: {
            return {
                ...adapter.removeOne(action.payload, state),
                operationSuccessful: true
            };
        }


        default: {
            return state;
        }
    }

}

export const getSelectedChain = (state: State) => state.currentChain;
export const getOperationSuccessful = (state: State) => state.operationSuccessful;
export const getError = (state: State) => state.error;