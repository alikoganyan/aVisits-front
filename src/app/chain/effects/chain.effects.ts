import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import * as Chain from '../actions/collection';
import * as Layout from '../../shared/actions/layout';
import {ChainService} from "../chain.service";
import {of} from "rxjs/observable/of";
import "rxjs/add/operator/exhaustMap";
import "rxjs/add/operator/catch";

@Injectable()
export class ChainEffects {
    @Effect()
    loadChains$: Observable<Action> = this.actions$
        .ofType(Chain.LOAD_ALL)
        .exhaustMap(() =>
            this.chainService
                .getChains()
                .map(response => new Chain.LoadAllSuccess(response))
                .catch(error => of(new Chain.LoadAllFailure(error)))
        );

    @Effect()
    addChain$ = this.actions$
        .ofType(Chain.ADD_CHAIN)
        .map((action: Chain.AddChain) => action.payload)
        .exhaustMap(chain =>
            this.chainService
                .createChain(chain)
                .map(response => new Chain.AddChainSuccess(response))
                .catch(error => of(new Chain.AddChainFailure(error.json())))
        );

    @Effect()
    updateChain$ = this.actions$
        .ofType(Chain.UPDATE_CHAIN)
        .map((action: Chain.UpdateChain) => action.payload)
        .exhaustMap(chain =>
            this.chainService
                .updateChain(chain)
                .map(response => new Chain.UpdateChainSuccess(response))
                .catch(error => of(new Chain.UpdateChainFailure(error)))
        );

    @Effect()
    deleteChain$ = this.actions$
        .ofType(Chain.REMOVE_CHAIN)
        .map((action: Chain.RemoveChain) => action.payload)
        .exhaustMap(chainId =>
            this.chainService
                .deleteChain(chainId)
                .map(response => new Chain.RemoveChainSuccess(chainId))
                .catch(error => of(new Chain.RemoveChainFailure(error)))
        );


    // @Effect()
    // updateChainSuccess$ = this.actions$
    //     .ofType(Chain.UPDATE_CHAIN_SUCCESS)
    //     .map(() => new Layout.CloseModal());
    //
    // @Effect()
    // addChainSuccess$ = this.actions$
    //     .ofType(Chain.ADD_CHAIN_SUCCESS)
    //     .map(() => new Layout.CloseModal());

    constructor(
        private actions$: Actions,
        private chainService: ChainService
    ) {}
}