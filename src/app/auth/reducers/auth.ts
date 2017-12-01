import * as auth from '../actions/auth';
import * as signup from '../actions/signup';
import {Credentials, UserChain} from "../_models/user";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

export interface State {
    token: string | null;
    error: string | null;
    credentials: Credentials | null;
}


export const initialState: State = {
    token: null,
    error: null,
    credentials: null,
};

export function reducer(state = initialState, action: auth.Actions | signup.Actions): State {
    switch(action.type) {
        case auth.LOGIN_SUCCESS: {
            return {
                ...state,
                token: action.payload.token,
                error: null
            };
        }

        case auth.SUBMIT_CREDENTIALS: {
            return {
                ...state,
                credentials: action.payload,
                error: null
            };
        }

        case auth.SUBMIT_CREDENTIALS_FAILURE: {
            return {
                ...state,
                error: action.payload.status
            };
        }

        case auth.LOGIN_FAILURE:
        case signup.SUBMIT_REGISTER_FAILURE: {
            return {
                ...state,
                error: action.payload.error
            };
        }

        case auth.LOGOUT: {
            return initialState;
        }

        case signup.SUBMIT_REGISTER_SUCCESS: {
            return {
                ...state,
                error: null
            };
        }

        default: {
            return state;
        }
    }
}

export const getToken = (state: State) => state.token;
export const getError = (state: State) => state.error;
export const getCredentials = (state: State) => state.credentials;