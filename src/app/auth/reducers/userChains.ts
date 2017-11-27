import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {UserChain} from "../_models/user";
import * as auth from '../actions/auth';

export interface State extends EntityState<UserChain> {
    selectedChainId: number | null;
}

export const adapter: EntityAdapter<UserChain> = createEntityAdapter<UserChain>({
    selectId: (chain: UserChain) => chain.id,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    selectedChainId: null
});

export function reducer(state = initialState, action: auth.Actions): State {
    switch(action.type) {
        case auth.SUBMIT_CREDENTIALS_SUCCESS: {
            return {
                ...adapter.addMany(action.payload.userChains, state)
            };
        }

        case auth.SELECT_CHAIN: {
            return {
                ...state,
                selectedChainId: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getSelectedChainId = (state: State) => state.selectedChainId;