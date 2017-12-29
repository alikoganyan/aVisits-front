import {createSelector} from "@ngrx/store";
import * as fromRoot from './index';
import * as fromChain from './chain';
import * as fromFilter from '../../../../reducers/filter';
import * as filterReducer from '../../../../filter/reducers';
import {Chain} from "../../../../chain/chain.model";
import _ = require("lodash");


export const selectFilterByChainDataSource = createSelector(
    fromChain.selectAllChains,
    (chains: Chain[]) => chains.map(c => ({ id: c.id, title: c.title}))
);

export const selectGlobalFilterDataSource = createSelector(
    fromChain.selectAllChains,
    (chains: Chain[]) =>
        chains.map(c => ({
            key: c.title,
            items: c.salons
        }))
);

export const selectFilterByChainExtendedDataSource = createSelector(
    selectFilterByChainDataSource,
    (chainsInfo: {id: number, title: string}[]) => {
        chainsInfo.unshift({ id: null, title: "Все сети"});

        return chainsInfo;
    }
);