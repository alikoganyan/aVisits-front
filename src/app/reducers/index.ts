import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from '../auth/reducers';
import * as fromLayout from '../shared/reducers/layout';
import * as fromRootFilter from './filter';
import {RouterStateUrl} from "../shared/router.utils";
import {ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from "@ngrx/store";
import {localStorageSync} from "ngrx-store-localstorage";
import * as filterReducer from "../filter/reducers/filter";
import {storeFreeze} from "ngrx-store-freeze";
import {environment} from "../../environments/environment";

export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>,
    layout: fromLayout.State,
    filter: filterReducer.FilterState,
}

export const reducers =  {
    routerReducer: fromRouter.routerReducer,
    layout: fromLayout.reducer,
    filter: filterReducer.reducer,
};

export function localStorageSyncAuthReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: [{
            auth: { reviver: (key, value) => key === 'error' ? null : value }
        }],
        rehydrate: true
    })(reducer);
}

export function localStorageSyncFilterReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: [ 'filter' ],
        rehydrate: true
    })(reducer);
}

function getMetaReducers() {
    let reducers: any = [localStorageSyncAuthReducer, localStorageSyncFilterReducer];
    if(!environment.production) {
        reducers.push(storeFreeze);
    }

    return reducers;
}

export const metaReducers: Array<MetaReducer<any, any>> = getMetaReducers();

// export const selectLayoutState = createFeatureSelector<fromLayout.State>('layout');
//
// export const getShowModal = createSelector(
//     selectLayoutState,
//     fromLayout.getShowModal
// );