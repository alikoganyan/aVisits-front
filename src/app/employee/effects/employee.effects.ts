import {Observable} from "rxjs/Observable";
import {Actions, Effect} from "@ngrx/effects";
import {EntityCollectionEffects} from "../../entity-collection/entity-collection.effects";
import {Injectable} from "@angular/core";
import {Employee} from "../employee.model";
import {EmployeeService} from "../employee.service";
import {EmployeeCollectionActions} from "../actions/collection";

@Injectable()
export class EmployeeEffects extends EntityCollectionEffects<Employee>{

    fetchEntities(args?: any): Observable<any> {
        return this.employeeService.getAllByChain(<number>args);
    }

    addEntity(value: Employee): Observable<any> {
        return this.employeeService.create(value);
    }

    updateEntity(value: Employee): Observable<any> {
        return this.employeeService.update(value);
    }

    removeEntity(value: Employee): Observable<any> {
        return this.employeeService.delete(value);
    }

    fetchSingleEntity(args?: any): Observable<any> {
        return this.employeeService.getById(args);
    }

    @Effect()
    loadEmployees$ = this.loadEntitiesEffect$;

    @Effect()
    addEmployee$ = this.addEntityEffect$;

    @Effect()
    updateEmployee$ = this.updateEntityEffect$;

    @Effect()
    deleteEmployee$ = this.removeEntityEffect$;

    @Effect()
    loadSingleEmployee$ = this.loadSingleEntityEffect;


    constructor(
        protected employeeService: EmployeeService,
        protected actions$: Actions,
        protected collectionActions: EmployeeCollectionActions)
    {
        super(actions$, collectionActions)
    }
}