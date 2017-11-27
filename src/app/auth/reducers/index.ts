import * as fromAuth from './auth';
import * as fromUserChains from './userChains';
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface AuthState {
    status: fromAuth.State;
    userChains: fromUserChains.State;
}

export interface State {
    auth: AuthState;
}

export const reducers = {
    status: fromAuth.reducer,
    userChains: fromUserChains.reducer
};


export const selectAuthState = createFeatureSelector('auth');

export const selectAuthStatusState = createSelector(
    selectAuthState,
    (state: AuthState) => state.status
);

export const selectUserChainEntitiesState = createSelector(
    selectAuthState,
    (state: AuthState) => state.userChains
);

export const getSelectedChainId = createSelector(
    selectUserChainEntitiesState,
    fromUserChains.getSelectedChainId
);


export const {
    selectIds: getUserChainIds,
    selectEntities: getUserChainEntities,
    selectAll: getAllUserChains,
    selectTotal: getTotalUserChains,
} = fromUserChains.adapter.getSelectors(selectUserChainEntitiesState);

export const getSelectedChain = createSelector(
    getUserChainEntities,
    getSelectedChainId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    }
);

export const getToken = createSelector(selectAuthStatusState, fromAuth.getToken);
export const getError = createSelector(selectAuthStatusState, fromAuth.getError);
export const getCredentials = createSelector(selectAuthStatusState, fromAuth.getCredentials);


