import * as fromRoot from './index';
import * as fromChains from '../../../../chain/reducers/chain';

import {createSelector} from "@ngrx/store";

/**
 * Chains
 */
export const selectChainsState = createSelector(fromRoot.getRootState, state => state.chains);

export const {
    selectIds: selectChainIds,
    selectEntities: selectChainEntities,
    selectAll: selectAllChains,
    selectTotal: selectChainTotal
} = fromChains.adapter.getSelectors(selectChainsState);

export const selectCurrentChain = createSelector(selectChainsState, fromChains.getSelectedChain);
export const selectOperationSuccessful = createSelector(selectChainsState, fromChains.getOperationSuccessful);
export const selectError = createSelector(selectChainsState, fromChains.getError);