import {Action} from "@ngrx/store";
import {UniqueEntity} from "./unique-entity";

export enum CollectionActions {
    SET_CURRENT_ENTITY,

    LOAD_ENTITY,
    LOAD_ENTITY_SUCCESS,
    LOAD_ENTITY_FAILURE,

    LOAD_ALL,
    LOAD_ALL_SUCCESS,
    LOAD_ALL_FAILURE,

    ADD_ENTITY,
    ADD_ENTITY_SUCCESS,
    ADD_ENTITY_FAILURE,

    UPDATE_ENTITY,
    UPDATE_ENTITY_SUCCESS,
    UPDATE_ENTITY_FAILURE,

    REMOVE_ENTITY,
    REMOVE_ENTITY_SUCCESS,
    REMOVE_ENTITY_FAILURE,

    FINISH_OPERATION
}

export abstract class EntityCollectionActions<T extends UniqueEntity> {
    protected abstract get entityName(): string;

    public actionTypes: ActionTypeMap = this.generateActionTypes();

    SetCurrentEntity = ActionFactory.create<T>(this.actionTypes[CollectionActions.SET_CURRENT_ENTITY]);

    LoadEntity         = ActionFactory.create<number>  (this.actionTypes[CollectionActions.LOAD_ENTITY]);
    LoadEntitySuccess  = ActionFactory.create<T[]>     (this.actionTypes[CollectionActions.LOAD_ENTITY_SUCCESS]);
    LoadEntityFailure  = ActionFactory.create<any>     (this.actionTypes[CollectionActions.LOAD_ENTITY_FAILURE]);

    LoadAll         = ActionFactory.create<number>  (this.actionTypes[CollectionActions.LOAD_ALL]);
    LoadAllSuccess  = ActionFactory.create<T[]>     (this.actionTypes[CollectionActions.LOAD_ALL_SUCCESS]);
    LoadAllFailure  = ActionFactory.create<any>     (this.actionTypes[CollectionActions.LOAD_ALL_FAILURE]);

    AddEntity           = ActionFactory.create<T>   (this.actionTypes[CollectionActions.ADD_ENTITY]);
    AddEntitySuccess    = ActionFactory.create<T>   (this.actionTypes[CollectionActions.ADD_ENTITY_SUCCESS]);
    AddEntityFailure    = ActionFactory.create<any> (this.actionTypes[CollectionActions.ADD_ENTITY_FAILURE]);

    UpdateEntity        = ActionFactory.create<T>   (this.actionTypes[CollectionActions.UPDATE_ENTITY]);
    UpdateEntitySuccess = ActionFactory.create<T>   (this.actionTypes[CollectionActions.UPDATE_ENTITY_SUCCESS]);
    UpdateEntityFailure = ActionFactory.create<any> (this.actionTypes[CollectionActions.UPDATE_ENTITY_FAILURE]);

    RemoveEntity        = ActionFactory.create<T>       (this.actionTypes[CollectionActions.REMOVE_ENTITY]);
    RemoveEntitySuccess = ActionFactory.create<number>  (this.actionTypes[CollectionActions.REMOVE_ENTITY_SUCCESS]);
    RemoveEntityFailure = ActionFactory.create<any>     (this.actionTypes[CollectionActions.REMOVE_ENTITY_FAILURE]);

    FinishOperation = ActionFactory.create(this.actionTypes[CollectionActions.FINISH_OPERATION]);

    constructor() {}

    generateActionTypes(): ActionTypeMap {
        let identifier = `[${this.entityName} Collection]`;
        let map: ActionTypeMap = {};

        map[CollectionActions.SET_CURRENT_ENTITY]   = `${identifier} Set Current Entity`;

        map[CollectionActions.LOAD_ENTITY]             = `${identifier} Load Entity`;
        map[CollectionActions.LOAD_ENTITY_SUCCESS]     = `${identifier} Load Entity Success`;
        map[CollectionActions.LOAD_ENTITY_FAILURE]     = `${identifier} Load Entity Failure`;

        map[CollectionActions.LOAD_ALL]             = `${identifier} Load All`;
        map[CollectionActions.LOAD_ALL_SUCCESS]     = `${identifier} Load All Success`;
        map[CollectionActions.LOAD_ALL_FAILURE]     = `${identifier} Load All Failure`;

        map[CollectionActions.ADD_ENTITY]           = `${identifier} Add Entity`;
        map[CollectionActions.ADD_ENTITY_SUCCESS]   = `${identifier} Add Entity Success`;
        map[CollectionActions.ADD_ENTITY_FAILURE]   = `${identifier} Add Entity Failure`;

        map[CollectionActions.UPDATE_ENTITY]           = `${identifier} Update Entity`;
        map[CollectionActions.UPDATE_ENTITY_SUCCESS]   = `${identifier} Update Entity Success`;
        map[CollectionActions.UPDATE_ENTITY_FAILURE]   = `${identifier} Update Entity Failure`;

        map[CollectionActions.REMOVE_ENTITY]           = `${identifier} Remove Entity`;
        map[CollectionActions.REMOVE_ENTITY_SUCCESS]   = `${identifier} Remove Entity Success`;
        map[CollectionActions.REMOVE_ENTITY_FAILURE]   = `${identifier} Remove Entity Failure`;

        map[CollectionActions.FINISH_OPERATION]   = `${identifier} Finish Operation`;

        return map;
    }
}

export class ActionBase<TPayload> implements Action {
    constructor(public type: string, public payload?: TPayload){}
}

class ActionFactory {
    static create?<TPayload>(type: string) {
        return (payload?): ActionBase<TPayload> => {
            return new ActionBase<TPayload>(type, payload);
        }
    }
}

interface ActionTypeMap {
    [key: string]: string;
}
