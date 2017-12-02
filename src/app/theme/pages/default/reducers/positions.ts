import * as fromRoot from './index';
import * as fromPosition from '../../../../position/reducers/position';
import {createSelector} from "@ngrx/store";

export const selectPositionsRootState = createSelector(fromRoot.getRootState,
        state => state.positions);

export const selectPositionEntitiesState = createSelector(selectPositionsRootState,
    fromPosition.getEntitiesState);

export const {
    selectIds: selectPositionsIds,
    selectEntities: selectPositionEntities,
    selectAll: selectAllPositions,
    selectTotal: selectPositionTotal
} = fromPosition.positionEntityReducer.getCollectionSelectors(selectPositionEntitiesState);

export const selectCurrentPosition = createSelector(selectPositionEntitiesState, fromPosition.getCurrentPosition);
export const selectOperationComplete = createSelector(selectPositionEntitiesState, fromPosition.getOperationComplete);
export const selectError = createSelector(selectPositionEntitiesState, fromPosition.getError);
export const selectLoading = createSelector(selectPositionEntitiesState, fromPosition.getLoading);