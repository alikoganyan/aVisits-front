import * as fromRoot from './index';
import * as fromService from '../../../../salon-service/reducers/index';
import {createSelector} from "@ngrx/store";

export const selectSalonServiceState = createSelector(
    fromRoot.getRootState,
    state => state.salonServices);

export const selectSalonServiceEntititesState = createSelector(
    selectSalonServiceState,
    fromService.getEntitiesState
);

export const {
    selectIds: selectSalonServicesIds,
    selectEntities: selectSalonServiceEntities,
    selectAll: selectAllSalonServices,
    selectTotal: selectSalonServiceTotal
} = fromService.salonServiceEntityReducer.getCollectionSelectors(selectSalonServiceState);

export const selectCurrentServiceCategory = createSelector(selectSalonServiceEntititesState, fromService.getCurrentSalonService);
export const selectOperationComplete = createSelector(selectSalonServiceEntititesState, fromService.getOperationComplete);
export const selectError = createSelector(selectSalonServiceEntititesState, fromService.getError);
export const selectLoading = createSelector(selectSalonServiceEntititesState, fromService.getLoading);