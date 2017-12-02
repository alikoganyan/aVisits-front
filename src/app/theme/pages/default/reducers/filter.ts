import {createSelector} from "@ngrx/store";
import * as fromRoot from './index';
import * as fromFilter from '../../../../filter/reducers';


export const selectFilterState = createSelector(fromRoot.getRootState,
    state => state.filter);

export const selectFilterChainId = createSelector(selectFilterState, fromFilter.getFilterChainId);