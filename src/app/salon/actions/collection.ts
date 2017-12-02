import {Action} from "@ngrx/store";
import {Salon} from "../salon.model";
import {ActionWithPayload} from "../../shared/interfaces";
import {EntityCollectionActions} from "../../entity-collection/entity-collection.actions";


export class SalonCollectionActions extends EntityCollectionActions<Salon> {
    protected get entityName(): string {
        return 'Salon';
    }

    constructor() {
        super();
    }
}

export const collectionActions = new SalonCollectionActions();
