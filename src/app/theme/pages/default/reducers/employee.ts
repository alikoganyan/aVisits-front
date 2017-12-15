import {createSelector} from "@ngrx/store";
import * as fromRoot from "./index";
import * as fromEmployees from "../../../../employee/reducers/employee";
import * as filterReducer from "../../../../reducers/filter";

export const selectEmployeesRootState = createSelector(fromRoot.getRootState,
        state => state.employees);

export const selectEmployeeEntitiesState = createSelector(selectEmployeesRootState,
    fromEmployees.getEntitiesState);

export const {
    selectIds: selectEmployeeIds,
    selectEntities: selectEmployeeEntities,
    selectAll: selectAllEmployees,
    selectTotal: selectEmployeeTotal
} = fromEmployees.employeeEntityReducer.getCollectionSelectors(selectEmployeeEntitiesState);

export const selectCurrentEmployee = createSelector(selectEmployeeEntitiesState, fromEmployees.getCurrentEmployee);
export const selectOperationSuccessful = createSelector(selectEmployeeEntitiesState, fromEmployees.getOperationComplete);
export const selectError = createSelector(selectEmployeeEntitiesState, fromEmployees.getError);
export const selectLoading = createSelector(selectEmployeeEntitiesState, fromEmployees.getLoading);

export const selectEmployeesBySalon = createSelector(
    selectAllEmployees,
    filterReducer.selectFilterChainId,
    filterReducer.selectFilterSalonId,
    (employees, filterChainId, filterSalonId) =>
        employees.filter(e =>
            filterSalonId
                ? employeeBelongsToSalon(e, filterSalonId, filterChainId)
                : employeeBelongsToChain(e, filterChainId)
        )
);

const employeeBelongsToChain = (employee, chainId) => employee.chain_id === chainId;
const employeeBelongsToSalon = (employee, salonId, chainId) => {
    return employee.salonIds.length
        ? employee.salonIds.some(s => s === salonId)
        : employeeBelongsToChain(employee, chainId)

};