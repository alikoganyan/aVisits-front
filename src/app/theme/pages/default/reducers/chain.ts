import * as fromRoot from './index';
import * as fromChains from '../../../../chain/reducers/chain';

import {createSelector} from "@ngrx/store";

/**
 * Chains
 */
export const selectChainsRootState = createSelector(fromRoot.getRootState,
        state => state.chains);

// export const selectChainsState = createSelector(selectChainsRootState,
//         state => state.state);
export const selectChainEntitiesState = createSelector(selectChainsRootState,
    fromChains.getEntitiesState);


export const {
    selectIds: selectChainIds,
    selectEntities: selectChainEntities,
    selectAll: selectAllChains,
    selectTotal: selectChainTotal
} = fromChains.chainEntityReducer.getCollectionSelectors(selectChainEntitiesState);

export const selectLoading = createSelector(selectChainEntitiesState, fromChains.getLoading);
export const selectError = createSelector(selectChainEntitiesState, fromChains.getError);
export const selectOperationSuccessful = createSelector(selectChainEntitiesState, fromChains.getOperationComplete);
export const selectCurrentChain = createSelector(selectChainEntitiesState, fromChains.getCurrentChain);
//
// export const selectCurrentChain = createSelector(
//     selectChainEntities,
//     selectCurrentChainId,
//     (entities, selectedId) => selectedId && entities[selectedId]
// );