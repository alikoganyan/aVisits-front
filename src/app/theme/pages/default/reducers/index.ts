import * as fromRoot from '../../../../reducers';
import * as fromChains from '../../../../chain/reducers/chain';
import * as fromSalons from '../../../../salon/reducers/collection';


import {ActionReducerMap, combineReducers, createFeatureSelector, createSelector} from "@ngrx/store";
import {InjectionToken} from "@angular/core";

export interface State extends fromRoot.State {
    chains: fromChains.State,
    salons: fromSalons.State,
}

export function getReducers() {
    return {
        chains: fromChains.reducers,
        salons: fromSalons.reducers,
    }
};

export const getRootState = createFeatureSelector<State>('default-page');

export const reducerToken = new InjectionToken<ActionReducerMap<State>>('Reducers');

//https://github.com/ngrx/platform/issues/306
export const reducerProvider = [
    { provide: reducerToken, useFactory: getReducers }
];