import {EntityCollectionActions} from "../../entity-collection/entity-collection.actions";
import {SalonServiceModel} from "../salon-service.model";

export class SalonServiceCollectionActions extends EntityCollectionActions<SalonServiceModel> {
    protected get entityName(): string {
        return 'Salon Service';
    }

    constructor() {
        super();
    }
}

export const collectionActions = new SalonServiceCollectionActions();