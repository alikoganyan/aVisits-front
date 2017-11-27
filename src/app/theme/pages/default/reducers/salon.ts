import * as fromRoot from './index';
import * as fromSalons from '../../../../salon/reducers/collection';
import {createSelector} from "@ngrx/store";

/**
 * Salons
 */
export const selectSalonsState = createSelector(fromRoot.getRootState, state => state.salons);

export const {
    selectIds: selectSalonsIds,
    selectEntities: selectSalonEntities,
    selectAll: selectAllSalons,
    selectTotal: selectSalonTotal
} = fromSalons.adapter.getSelectors(selectSalonsState);

export const selectCurrentSalon = createSelector(selectSalonsState, fromSalons.getSelectedSalon);
export const selectOperationSuccessful = createSelector(selectSalonsState, fromSalons.getOperationSuccessful);
export const selectError = createSelector(selectSalonsState, fromSalons.getError);