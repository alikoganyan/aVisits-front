import {EntityCollectionActions} from "../../entity-collection/entity-collection.actions";
import {Employee} from "../employee.model";

export class EmployeeCollectionActions extends EntityCollectionActions<Employee> {
    protected get entityName(): string {
        return 'Employee';
    }

    constructor() {
        super();
    }
}

export const collectionActions = new EmployeeCollectionActions();