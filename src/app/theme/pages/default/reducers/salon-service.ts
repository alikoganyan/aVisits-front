import * as fromRoot from './index';
import * as fromService from '../../../../salon-service/reducers/index';
import {createSelector} from "@ngrx/store";
import * as fromCategory from "./service-category";
import _ = require("lodash");
import {SalonServiceModel} from "../../../../salon-service/salon-service.model";
import {ServiceCategoryModel} from "../../../../services-category/service-category.model";
import {SalonService} from "../../../../salon/salon.service";
import {selectAllServiceCategories} from "./service-category";
import {selectServiceCategoryEntities} from "./service-category";

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
        service_id: s.id,
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

export const selectCategoriesWithServices = createSelector(
    fromCategory.selectServiceCategoriesDataSource,
    selectServicesDataSource,
    (allCategories: any, services: any) => allCategories.map(c => {
            c.items = services.filter(s => s.parent_id === c.id);

            return c;
        })
);

/**
 * tree structure
 */
export const selectServicesTreeDataSource = createSelector(
    selectCategoriesWithServices,
    selectServiceCategoryEntities,
    (categories, idMap) => {

        let items = [];
        (<Array<any>>categories).forEach(category => {
            if(!category.items) {
                category.items = [];
            }

            if(category.parent_id) {
                let parent = idMap[category.parent_id];
                if(!parent.items) {
                    parent.items = [];
                }

                parent.items.push(category);
            }
            else {
                items.push(category)
            }
        });

        console.log(categories, items);
        return items;
    }
);