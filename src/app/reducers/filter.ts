import * as fromRoot from "./index";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as filterReducer from "../filter/reducers";
import * as fromSalonCollection from "../theme/pages/default/reducers/salon-collection";

export const selectFilterState = createFeatureSelector('filter');

export const selectFilterChainId = createSelector(selectFilterState, filterReducer.getFilterChainId);
export const selectFilterSalonId = createSelector(selectFilterState, filterReducer.getFilterSalonId);
export const selectFilterSalon = createSelector(
    fromSalonCollection.selectAllSalons,
    selectFilterSalonId,
    (salons, selectedId) => selectedId ? salons[selectedId] : null
);