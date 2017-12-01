import * as fromRoot from './index';
import * as fromSalons from '../../../../salon/reducers/collection';
import {createSelector} from "@ngrx/store";

/**
 * Salons
 */
export const selectSalonsRootState = createSelector(fromRoot.getRootState, state => state.salons);

export const selectSalonEntitiesState = createSelector(selectSalonsRootState,
    fromSalons.getEntitiesState);

export const selectSalonPageState = createSelector(selectSalonsRootState,
    fromSalons.getPageState);

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

export const selectFilterChainId = createSelector(selectSalonPageState, fromSalons.getFilterChainId);