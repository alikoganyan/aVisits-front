import {Observable} from "rxjs/Observable";
import {CollectionActions, EntityCollectionActions, ActionBase} from "./entity-collection.actions";
import {Action} from "@ngrx/store";
import {of} from "rxjs/observable/of";
import {Actions} from "@ngrx/effects";
import {UniqueEntity} from "./unique-entity";

export abstract class EntityCollectionEffects<T extends UniqueEntity> {
    abstract fetchEntities(args?: any): Observable<any>;
    abstract addEntity(value: T): Observable<any>;
    abstract updateEntity(value: T): Observable<any>;
    abstract removeEntity(value: T): Observable<any>;


    loadEntitiesEffect$: Observable<Action> = this.actions$
        .ofType(this.collectionActions.actionTypes[CollectionActions.LOAD_ALL])
        .map((action: ActionBase<T>) => action.payload)
        .exhaustMap((args) => this.fetchEntities(args)
            .map(response => {
                if(!response.length)
                    response = null; // adapter.addAll incorrectly processes empty arrays

                return this.collectionActions.LoadAllSuccess(response)
            })
            .catch(error =>
                of(this.collectionActions.LoadAllFailure(error))
            )
        );

    addEntityEffect$: Observable<Action> = this.actions$
        .ofType(this.collectionActions.actionTypes[CollectionActions.ADD_ENTITY])
        .map((action: ActionBase<T>) => action.payload)
        .exhaustMap(value => this.addEntity(value)
            .mergeMap(response => [
                this.collectionActions.AddEntitySuccess(response),
                this.collectionActions.FinishOperation()
            ])
            .catch(error =>
                of(this.collectionActions.AddEntityFailure(error))
            )
        );

    updateEntityEffect$: Observable<Action> = this.actions$
        .ofType(this.collectionActions.actionTypes[CollectionActions.UPDATE_ENTITY])
        .map((action: ActionBase<T>) => action.payload)
        .exhaustMap(value => this.updateEntity(value)
            .mergeMap(response => [
                this.collectionActions.UpdateEntitySuccess(response),
                this.collectionActions.FinishOperation()
            ])
            .catch(error =>
                of(this.collectionActions.UpdateEntityFailure(error))
            )
        );

    removeEntityEffect$: Observable<Action> = this.actions$
        .ofType(this.collectionActions.actionTypes[CollectionActions.REMOVE_ENTITY])
        .map((action: ActionBase<T>) => action.payload)
        .map((value: T) => ({
            id: value.id,
            entity: value
        }))
        .exhaustMap(({id, entity}) => this.removeEntity(entity)
            .mergeMap(response => {
                return [
                    this.collectionActions.RemoveEntitySuccess(id),
                    this.collectionActions.FinishOperation()
                ];
            })
            .catch(error =>
                of(this.collectionActions.RemoveEntityFailure(error))
            )
        );


    constructor(
        protected actions$: Actions,
        protected collectionActions: EntityCollectionActions<T>
    ) {}
}