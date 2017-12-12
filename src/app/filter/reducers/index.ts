import {FilterState} from "./filter";

export const getFilterChainId = (state: FilterState) => state.selectedChainId;
export const getFilterSalonId = (state: FilterState) => state.selectedSalonId;