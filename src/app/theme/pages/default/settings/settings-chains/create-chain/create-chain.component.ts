import {Component, ViewEncapsulation} from '@angular/core';
import {Chain} from "../../../../../../chain/chain.model";

import * as fromRoot from '../../../reducers';
import * as chainActions from '../../../../../../chain/actions/collection';
import {Store} from "@ngrx/store";
import {ChainDialogBase} from "../chain-dialog-base/chain-dialog-base";

@Component({
    selector: 'app-create-chain',
    templateUrl: './create-chain.component.html',
    styleUrls: ['./create-chain.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateChainComponent extends ChainDialogBase {
    constructor(protected store: Store<fromRoot.State>,) {
        super(store);
    }

    createSaveAction(chain: Chain) {
        return chainActions.collectionActions.AddEntity(chain);
    }

}
