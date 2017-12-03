import * as fromSalonPage from '../actions/page';

export interface SalonPageState {
    selectedChainId: number | null;
}

export const initialState: SalonPageState = {
    selectedChainId: null
};

export function reducer(state: SalonPageState = initialState,
                        action: fromSalonPage.Actions) {

    switch(action.type) {
        case fromSalonPage.SET_FILTER_CHAIN_ID: {
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