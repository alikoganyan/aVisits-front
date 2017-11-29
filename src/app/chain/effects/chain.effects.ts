import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {ChainService} from "../chain.service";
import {of} from "rxjs/observable/of";
import "rxjs/add/operator/exhaustMap";
import "rxjs/add/operator/catch";
import {Chain} from "../chain.model";
import {ChainCollectionActions} from "../actions/collection";
import {EntityCollectionEffects} from "../../entity-collection/entity-collection.effects";


@Injectable()
export class ChainEffects extends EntityCollectionEffects<Chain>{
    fetchEntities(): Observable<any> {
        return this.chainService.getChains();
    }

    addEntity(value: Chain): Observable<any> {
        return this.chainService.createChain(value);
    }

    updateEntity(value: Chain): Observable<any> {
        return this.chainService.updateChain(value);
    }

    removeEntity(index: number): Observable<any> {
        return this.chainService.deleteChain(index);
    }

    @Effect()
    loadChains$ = this.loadEntitiesEffect$;

    @Effect()
    addChain$ = this.addEntityEffect$;

    @Effect()
    updateChain$ = this.updateEntityEffect$;

    @Effect()
    deleteChain$ = this.removeEntityEffect$;



    constructor(
        protected chainService: ChainService,
        protected actions$: Actions,
        protected collectionActions: ChainCollectionActions)
    {
        super(actions$, collectionActions)
    }
}