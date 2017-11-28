import {OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../../reducers';
import * as fromChain from '../../../reducers/chain';
import * as chainActions from '../../../../../../chain/actions/collection';
import {Chain} from "../../../../../../chain/chain.model";

export abstract class ChainDialogBase implements OnInit {
    chain$ = this.store.select(fromChain.selectCurrentChain);
    error$ = this.store.select(fromChain.selectError);

    protected abstract createSaveAction(chain: Chain): chainActions.AddChain | chainActions.UpdateChain;

    constructor(protected store: Store<fromRoot.State>) {
    }

    ngOnInit() {
    }

    onSaveChain(chain: Chain) {
        this.store.dispatch(this.createSaveAction(chain));
    }

    onDeleteChain(chain: any): void {
        this.store.dispatch(new chainActions.RemoveChain(chain.id));
    }
}