import {EntityCollectionActions} from "../../entity-collection/entity-collection.actions";
import {EmployeePosition} from "../position.model";

export class PositionCollectionActions extends EntityCollectionActions<EmployeePosition> {
    protected get entityName(): string {
        return 'Position';
    }

    constructor() {
        super();
    }
}

export const collectionActions = new PositionCollectionActions();