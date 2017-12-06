import * as fromRoot from './index';
import * as fromCategory from '../../../../services-category/reducers/index';
import {createSelector} from "@ngrx/store";

export const selectServiceCategoryState = createSelector(
    fromRoot.getRootState,
    state => state.serviceCategories);

export const selectServiceCategoryEntititesState = createSelector(
    selectServiceCategoryState,
    fromCategory.getEntitiesState
);

export const {
    selectIds: selectServiceCategoriesIds,
    selectEntities: selectServiceCategoryEntities,
    selectAll: selectAllServiceCategories,
    selectTotal: selectServiceCategoryTotal
} = fromCategory.serviceCategoryEntityReducer.getCollectionSelectors(selectServiceCategoryEntititesState);

export const selectCurrentServiceCategory = createSelector(selectServiceCategoryEntititesState, fromCategory.getCurrentServiceCategory);
export const selectOperationComplete = createSelector(selectServiceCategoryEntititesState, fromCategory.getOperationComplete);
export const selectError = createSelector(selectServiceCategoryEntititesState, fromCategory.getError);
export const selectLoading = createSelector(selectServiceCategoryEntititesState, fromCategory.getLoading);

/**
 * tree structure
 */
export const selectServiceCategoriesDataSource = createSelector(
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
)