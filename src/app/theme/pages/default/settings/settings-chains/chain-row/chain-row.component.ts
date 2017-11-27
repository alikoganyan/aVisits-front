import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output,
    ViewEncapsulation
} from '@angular/core';
import { Chain } from "../../../../../../chain/chain.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-chain-row',
    templateUrl: './chain-row.component.html',
    styleUrls: ['./chain-row.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChainRowComponent implements OnInit {
    @Input() chain: Chain;
    @Output() editChainRequested = new EventEmitter<Chain>();

    constructor() {
    }

    ngOnInit() {
    }

    editChain(chain: Chain): void {
        this.editChainRequested.next(chain);
    }

}
