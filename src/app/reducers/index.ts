import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from '../auth/reducers';
import * as fromLayout from '../shared/reducers/layout';
import {RouterStateUrl} from "../shared/router.utils";
import {ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from "@ngrx/store";
import {localStorageSync} from "ngrx-store-localstorage";

export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>,
    layout: fromLayout.State
}

export const reducers =  {
    routerReducer: fromRouter.routerReducer,
    layout: fromLayout.reducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: [{
            auth: [{'status': 'token'}, 'userChains']
        }],
        rehydrate: true
    })(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

// export const selectLayoutState = createFeatureSelector<fromLayout.State>('layout');
//
// export const getShowModal = createSelector(
//     selectLayoutState,
//     fromLayout.getShowModal
// );