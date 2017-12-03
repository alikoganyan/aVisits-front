import * as fromRoot from './index';
import * as fromFilter from './filter';
import * as fromSalons from '../../../../salon/reducers';
import * as chainReducer from './chain';
import {Salon} from "../../../../salon/salon.model";
import {Chain} from "../../../../chain/chain.model";
import {createSelector} from "@ngrx/store";

/**
 * Salons
 */
export const selectSalonsRootState = createSelector(fromRoot.getRootState, state => state.salons);

export const selectSalonEntitiesState = createSelector(selectSalonsRootState,
    fromSalons.getEntitiesState);

// export const selectSalonPageState = createSelector(selectSalonsRootState,
//     fromSalons.getPageState);

export const {
    selectIds: selectSalonsIds,
    selectEntities: selectSalonEntities,
    selectAll: selectAllSalons,
    selectTotal: selectSalonTotal
} = fromSalons.salonEntityReducer.getCollectionSelectors(selectSalonEntitiesState);

export const selectCurrentSalon = createSelector(selectSalonEntitiesState, fromSalons.getCurrentSalon);
export const selectOperationSuccessful = createSelector(selectSalonEntitiesState, fromSalons.getOperationComplete);
export const selectError = createSelector(selectSalonEntitiesState, fromSalons.getError);
export const selectLoading = createSelector(selectSalonEntitiesState, fromSalons.getLoading);

// export const selectFilterChainId = createSelector(selectSalonPageState, fromSalons.getFilterChainId);



export const filterSalonsByChain = createSelector(
    selectAllSalons,
    fromFilter.selectFilterChainId,
    (salons: Salon[], filterChainId) => salons.filter(s =>
        filterChainId ? s.chain_id === filterChainId : true
    )
);

/**
 * extend salons with chain_id
 */
export const selectSalons = createSelector(
    chainReducer.selectAllChains,
    filterSalonsByChain,
    (chains: Chain[], salons: Salon[]) => {
        if(chains && salons) {
            return salons.map(salon => {
                return {
                    salon: salon,
                    chainTitle: getChainTitle(salon, chains)
                }
            })
        }
    }
);
function getChainTitle(salon: Salon, chains: Chain[]) {
    let chain = chains.filter(c => c.id === salon.chain_id)[0];
    return chain ? chain.title : '';
}
