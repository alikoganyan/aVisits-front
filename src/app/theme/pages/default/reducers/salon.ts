import * as fromSalonCollection from './salon-collection';
import * as chainReducer from './chain';
import {Salon} from "../../../../salon/salon.model";
import {Chain} from "../../../../chain/chain.model";
import {createSelector} from "@ngrx/store";
import * as filterReducer from "../../../../reducers/filter";



export const filterSalonsByChain = createSelector(
    fromSalonCollection.selectAllSalons,
    filterReducer.selectFilterChainId,
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
