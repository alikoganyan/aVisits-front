import * as fromFilter from '../actions/filter';

export interface FilterState {
    selectedChainId: number | null;
    selectedSalonId: number | null;
}

export const initialState: FilterState = {
    selectedChainId: null,
    selectedSalonId: null,
};

export function reducer(state: FilterState = initialState,
                        action: fromFilter.Actions) {

    switch(action.type) {
        case fromFilter.SET_FILTER_CHAIN_ID: {
            return {
                ...state,
                selectedChainId: action.payload
            };
        }

        case fromFilter.SET_FILTER_SALON_ID: {
            return {
                ...state,
                selectedSalonId: action.payload
            };
        }

        default: {
            return initialState;
        }
    }

}