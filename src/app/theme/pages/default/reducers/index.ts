import * as fromRoot from '../../../../reducers';
import * as fromChains from '../../../../chain/reducers/chain';
import * as fromSalons from '../../../../salon/reducers/collection';


import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";

export interface State extends fromRoot.State {
    chains: fromChains.State,
    salons: fromSalons.State,
}

export const reducers = {
    chains: fromChains.reducer,
    salons: fromSalons.reducer
};

export const getRootState = createFeatureSelector<State>('default-page');



