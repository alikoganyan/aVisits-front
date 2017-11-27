import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Salon} from "../salon.model";
import * as collection from '../actions/collection';
import * as salon from '../actions/salon';

export interface State extends EntityState<Salon> {
    currentSalon: Salon| null;
    loading: boolean;
    operationSuccessful: boolean;
    error: string | null;
}

export const adapter: EntityAdapter<Salon> = createEntityAdapter<Salon>({
    selectId: (salon: Salon) => salon.id,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    currentSalon: null,
    loading: false,
    operationSuccessful: false,
    error: null
});

export function reducer(
    state = initialState,
    action: collection.Actions | salon.Actions
) {

    switch (action.type) {
        case collection.SET_CURRENT_SALON: {
            return {
                ...state,
                currentSalon: action.payload
            };
        }

        case collection.LOAD_ALL_SUCCESS: {
            return {
                ...adapter.addAll(action.payload, state),
                loading: false
            }
        }

        case collection.ADD_SALON:
        case collection.UPDATE_SALON: {
            return {
                ...state,
                operationSuccessful: false
            };
        }

        case collection.ADD_SALON_SUCCESS: {
            return {
                ...adapter.addOne(action.payload, state),
                operationSuccessful: true
            };
        }

        case collection.UPDATE_SALON_SUCCESS: {
            return {
                ...adapter.updateOne({
                    id: action.payload.id,
                    changes: action.payload
                }, state),
                operationSuccessful: true
            };
        }

        case collection.ADD_SALON_FAILURE:
        case collection.UPDATE_SALON_FAILURE: {
            return {
                ...state,
                error: action.payload
            };
        }

        case salon.LOAD_SUCCESS: {
            return {
                ...adapter.updateOne({
                    id: action.payload.id,
                    changes: action.payload
                }, state)
            }
        }

        default: {
            return state;
        }
    }
}

export const getSelectedSalon = (state: State) => state.currentSalon;
export const getOperationSuccessful = (state: State) => state.operationSuccessful;
export const getError = (state: State) => state.error;

