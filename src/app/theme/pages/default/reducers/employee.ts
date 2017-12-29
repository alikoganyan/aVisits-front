import {createSelector} from "@ngrx/store";
import * as fromRoot from "./index";
import * as fromSalons from "./salon-collection";
import * as fromEmployees from "../../../../employee/reducers/employee";
import * as filterReducer from "../../../../reducers/filter";
import {Employee} from "../../../../employee/employee.model";

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
    (employees: any[], filterChainId, filterSalonId) =>
        employees.filter(e =>
            filterSalonId
                ? employeeBelongsToSalon(e, filterSalonId, filterChainId)
                : employeeBelongsToChain(e, filterChainId))
            .map(e => ({...e, salon_id: filterSalonId}))
);

const employeeBelongsToChain = (employee, chainId) => employee.chain_id === chainId;
const employeeBelongsToSalon = (employee, salonId, chainId) => {
    return employee.salonIds.length
        ? employee.salonIds.some(s => s === salonId)
        : employeeBelongsToChain(employee, chainId)

};

export const selectAssociatedSalons = createSelector(
    selectCurrentEmployee,
    fromSalons.selectSalonEntities,
    (e: Employee, salons: any) => e.salonIds.map(id => salons[id])
);

export const employeeAssociatedSalonsFactory = salonIds => createSelector(
    fromSalons.selectSalonEntities,
    (salons) => {
        return salonIds.map(id => salons[id]);
    }
);

export const selectEmployeeAttachableSalons = createSelector(
    selectCurrentEmployee,
    fromSalons.selectAllSalons,
    (employee: Employee, salons: Array<any>) =>
        salons && salons.filter(s => employee.salonIds.indexOf(s.id) < 0)
);
