import {Action} from "@ngrx/store";
import {Chain} from "../chain.model";
import {EntityCollectionActions} from "../../entity-collection/entity-collection.actions";


export class ChainCollectionActions extends EntityCollectionActions<Chain> {
    protected get entityName(): string {
        return 'Chain';
    }

    constructor() {
        super();
    }
}

export const collectionActions = new ChainCollectionActions();
