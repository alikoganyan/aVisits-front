import * as fromRoot from "./index";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as filterReducer from "../filter/reducers";

export const selectFilterState = createFeatureSelector('filter');

export const selectFilterChainId = createSelector(selectFilterState, filterReducer.getFilterChainId);
