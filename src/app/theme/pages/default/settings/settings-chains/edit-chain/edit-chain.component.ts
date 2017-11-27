import {Component, Injector, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ChainService } from "../../../../../../chain/chain.service";
import { Chain } from "../../../../../../chain/chain.model";
import * as fromRoot from '../../../reducers';
import * as chainActions from '../../../../../../chain/actions/collection';
import {Store} from "@ngrx/store";
import {ChainDialogBase} from "../chain-dialog-base/chain-dialog-base";

@Component({
    templateUrl: './edit-chain.component.html',
    styleUrls: ['./edit-chain.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EditChainComponent extends ChainDialogBase {
    constructor(protected store: Store<fromRoot.State>,) {
        super(store);
    }
    
    createSaveAction(chain: Chain) {
        return new chainActions.UpdateChain(chain);
    }

}
