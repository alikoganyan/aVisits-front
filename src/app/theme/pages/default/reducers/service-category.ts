import * as fromRoot from './index';
import * as fromCategory from '../../../../services-category/reducers/index';
import {createSelector} from "@ngrx/store";
import {ServiceCategoryModel} from "../../../../services-category/service-category.model";

export const selectServiceCategoryState = createSelector(
    fromRoot.getRootState,
    state => state.serviceCategories);

export const selectServiceCategoryEntitiesState = createSelector(
    selectServiceCategoryState,
    fromCategory.getEntitiesState
);

export const {
    selectIds: selectServiceCategoriesIds,
    selectEntities: selectServiceCategoryEntities,
    selectAll: selectAllServiceCategories,
    selectTotal: selectServiceCategoryTotal
} = fromCategory.serviceCategoryEntityReducer.getCollectionSelectors(selectServiceCategoryEntitiesState);

export const selectCurrentServiceCategory = createSelector(selectServiceCategoryEntitiesState, fromCategory.getCurrentServiceCategory);
export const selectOperationComplete = createSelector(selectServiceCategoryEntitiesState, fromCategory.getOperationComplete);
export const selectError = createSelector(selectServiceCategoryEntitiesState, fromCategory.getError);
export const selectLoading = createSelector(selectServiceCategoryEntitiesState, fromCategory.getLoading);


export const selectServiceCategoriesDataSource = createSelector(
    selectAllServiceCategories,
    (categories: ServiceCategoryModel[]) => categories.map(c => ({
        id: c.id,
        title: c.title,
        parent_id: c.parent_id
    }))
);

export const selectServiceCategoriesExtendedDataSource = createSelector(
    selectServiceCategoriesDataSource,
    (categories: any[]) => {
        categories.unshift({id: -1, title: 'Нет', parent_id: null});
        return categories;
    }
);
/**
 * tree structure
 */
export const selectServiceCategoriesTreeDataSource = createSelector(
    selectAllServiceCategories,
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

        return items;
    }
);