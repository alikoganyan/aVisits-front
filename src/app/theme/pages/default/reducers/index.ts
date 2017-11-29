import * as fromRoot from '../../../../reducers';
import * as fromChains from '../../../../chain/reducers/chain';
import * as fromSalons from '../../../../salon/reducers/collection';


import {ActionReducerMap, combineReducers, createFeatureSelector, createSelector} from "@ngrx/store";

export interface State extends fromRoot.State {
    chains: fromChains.State,
    salons: fromSalons.State,
}

export const reducers = {
    chains: fromChains.reducers,
    salons: fromSalons.reducer
};

export const getRootState = createFeatureSelector<State>('default-page');



