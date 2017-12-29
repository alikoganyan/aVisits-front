import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {ActionBase, CollectionActions, EntityCollectionActions} from "./entity-collection.actions";
import {UniqueEntity} from "./unique-entity";

export interface EntityCollectionState<T extends UniqueEntity> extends EntityState<T> {
    currentEntity: T | null;
    loading: boolean;
    error: string | null;
    operationComplete: boolean;
}

export abstract class EntityCollectionReducer<T extends UniqueEntity, S extends EntityCollectionState<T>> {
    public adapter;

    constructor(
        private readonly actions: EntityCollectionActions<T>,
        selectId: any)
    {
        this.adapter = createEntityAdapter<T>({
            selectId: selectId,
            sortComparer: false
        });
    }

    public getReducer() {
        let initialState = this.adapter.getInitialState({
            currentEntity: null,
            loading: false,
            error: null,
            operationComplete: false
        });
        let actionTypes = this.actions.actionTypes;

        return (state = initialState, action: ActionBase<any>): EntityCollectionState<T> =>  {
            switch(action.type) {
                /**
                 * Select id
                 */
                case actionTypes[CollectionActions.SET_CURRENT_ENTITY]:
                case actionTypes[CollectionActions.LOAD_ENTITY_SUCCESS]: {
                    return {
                        ...state,
                        currentEntity: action.payload
                    }
                }
                /**
                 * Load all entities
                 */
                case actionTypes[CollectionActions.LOAD_ALL]: {
                    return {
                        ...state,
                        loading: true
                    };
                }

                case actionTypes[CollectionActions.LOAD_ALL_SUCCESS]: {
                    return {
                        ...this.adapter.addAll(action.payload, state),
                        loading: false
                    };
                }

                /**
                 * Initiate operation
                 */
                case actionTypes[CollectionActions.ADD_ENTITY]:
                case actionTypes[CollectionActions.UPDATE_ENTITY]:
                case actionTypes[CollectionActions.REMOVE_ENTITY]: {
                    return {
                        ...state,
                        operationComplete: false,
                        loading: true
                    };
                }

                /**
                 * Operation success
                 */
                case actionTypes[CollectionActions.ADD_ENTITY_SUCCESS]: {
                    return {
                        ...this.adapter.addOne(action.payload, state),
                        operationComplete: true,
                        loading: false
                    };
                }

                case actionTypes[CollectionActions.UPDATE_ENTITY_SUCCESS]: {
                    return {
                        ...this.adapter.updateOne({
                            id: action.payload.id,
                            changes: action.payload
                        }, state),
                        operationComplete: true,
                        loading: false
                    };
                }

                case actionTypes[CollectionActions.REMOVE_ENTITY_SUCCESS]: {
                    return {
                        ...this.adapter.removeOne(action.payload, state),
                        operationComplete: true,
                        loading: false
                    };
                }

                /**
                 * Operation failure
                 */
                case actionTypes[CollectionActions.LOAD_ALL_FAILURE]:
                case actionTypes[CollectionActions.ADD_ENTITY_FAILURE]:
                case actionTypes[CollectionActions.UPDATE_ENTITY_FAILURE]:
                case actionTypes[CollectionActions.REMOVE_ENTITY_FAILURE]: {
                    return {
                        ...state,
                        error: action.payload,
                        loading: false
                    };
                }

                /**
                 * Finish operation (on dialog closed)
                 */
                case actionTypes[CollectionActions.FINISH_OPERATION]: {
                    return {
                        ...state,
                        error: null
                    }
                }

                default: {
                    return state;
                }
            }
        }
    }

    public getCollectionSelectors(selector) {
        return this.adapter.getSelectors(selector)
    }
}