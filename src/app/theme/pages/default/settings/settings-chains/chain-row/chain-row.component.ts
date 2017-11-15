import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { Chain } from "../../../../../../chain/chain.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-chain-row',
    templateUrl: './chain-row.component.html',
    styleUrls: ['./chain-row.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChainRowComponent implements OnInit {
    @Input() chain: Chain;
    @Output() editChainRequested: EventEmitter<any>;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {

        this.editChainRequested = new EventEmitter();
    }

    ngOnInit() {
    }

    editChain(chain: any): void {
        this.editChainRequested.next(chain);
    }

}
