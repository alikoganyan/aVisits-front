import * as fromRoot from './index';
import * as fromService from '../../../../salon-service/reducers/index';
import {createSelector} from "@ngrx/store";
import * as fromCategory from "./service-category";
import _ = require("lodash");
import {SalonServiceModel} from "../../../../salon-service/salon-service.model";
import {ServiceCategoryModel} from "../../../../services-category/service-category.model";
import {SalonService} from "../../../../salon/salon.service";

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
} = fromService.salonServiceEntityReducer.getCollectionSelectors(selectSalonServiceEntititesState);

export const selectCurrentService = createSelector(selectSalonServiceEntititesState, fromService.getCurrentSalonService);
export const selectOperationComplete = createSelector(selectSalonServiceEntititesState, fromService.getOperationComplete);
export const selectError = createSelector(selectSalonServiceEntititesState, fromService.getError);
export const selectLoading = createSelector(selectSalonServiceEntititesState, fromService.getLoading);

export const selectServicesDataSource = createSelector(
    selectAllSalonServices,
    (services: SalonServiceModel[]) => services.map(s => ({
        id: `${s.service_category_id}_${s.id}`,
        title: s.title,
        parent_id: s.service_category_id,
        entity: s,
        isService: true
    }))
);


export const selectServicesTreeViewDataSource = createSelector(
    fromCategory.selectServiceCategoriesDataSource,
    selectServicesDataSource,
    (categories: any, services: any) => _.flatten([categories, services])
);