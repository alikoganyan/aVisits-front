import {OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../../reducers';
import * as fromChain from '../../../reducers/chain';
import * as chainActions from '../../../../../../chain/actions/collection';
import {Chain} from "../../../../../../chain/chain.model";

export abstract class ChainDialogBase implements OnInit {
    chain$ = this.store.select(fromChain.selectCurrentChain);
    error$ = this.store.select(fromChain.selectError);
    loading$ = this.store.select(fromChain.selectLoading);

    protected abstract createSaveAction(chain: Chain);

    constructor(protected store: Store<fromRoot.State>) {
    }

    ngOnInit() {
    }

    onSaveChain(chain: Chain) {
        this.store.dispatch(this.createSaveAction(chain));
    }

    onDeleteChain(chain: any): void {
        this.store.dispatch(chainActions.collectionActions.RemoveEntity(chain.id));
    }
}