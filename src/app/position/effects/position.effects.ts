import {Injectable} from "@angular/core";
import {EntityCollectionEffects} from "../../entity-collection/entity-collection.effects";
import {EmployeePosition} from "../position.model";
import {Observable} from "rxjs/Observable";
import {EmployeePositionService} from "../position.service";
import {Actions, Effect} from "@ngrx/effects";
import {PositionCollectionActions} from "../actions/collection";

@Injectable()
export class PositionEffects extends EntityCollectionEffects<EmployeePosition> {

    fetchEntities(args?: any): Observable<any> {
        return this.positionService.getPositions(<number>args);
    }

    addEntity(value: EmployeePosition): Observable<any> {
        return this.positionService.createPosition(value);
    }

    updateEntity(value: EmployeePosition): Observable<any> {
        return this.positionService.updatePosition(value);
    }

    removeEntity(value: EmployeePosition): Observable<any> {
        return this.positionService.delete(value);
    }

    @Effect()
    loadPositions$ = this.loadEntitiesEffect$;

    @Effect()
    addPosition$ = this.addEntityEffect$;

    @Effect()
    updatePosition$ = this.updateEntityEffect$;

    @Effect()
    removePositions$ = this.removeEntityEffect$;


    constructor(
        protected positionService: EmployeePositionService,
        protected actions$: Actions,
        protected collectionActions: PositionCollectionActions)
    {
        super(actions$, collectionActions);
    }

}