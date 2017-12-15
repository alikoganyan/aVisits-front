import {EntityCollectionReducer, EntityCollectionState} from "../../entity-collection/entity-collection.reducer";
import {Employee} from "../employee.model";
import * as collection from "../../employee/actions/collection";
import {combineReducers} from "@ngrx/store";

export interface EmployeeEntityState extends EntityCollectionState<Employee> {
}

export interface State {
    employeeEntities: EmployeeEntityState;
}

class EmployeeEntityCollectionReducer extends EntityCollectionReducer<Employee, EmployeeEntityState> {
}

export const employeeEntityReducer = new EmployeeEntityCollectionReducer(
    collection.collectionActions,
    (e: Employee) => e.id
);

export const entityReducer = employeeEntityReducer.getReducer();

export const reducers = combineReducers({
    employeeEntities: entityReducer,
});


export const getEntitiesState = (state: State) => state.employeeEntities;

export const getError = (state: EmployeeEntityState) => state.error;
export const getCurrentEmployee = (state: EmployeeEntityState) => state.currentEntity;
export const getOperationComplete = (state: EmployeeEntityState) => state.operationComplete;
export const getLoading = (state: EmployeeEntityState) => state.loading;