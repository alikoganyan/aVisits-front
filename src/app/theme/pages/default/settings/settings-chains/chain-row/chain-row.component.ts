import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Chain} from "../../../../../../chain/chain.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-chain-row',
    templateUrl: './chain-row.component.html',
    styleUrls: ['./chain-row.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChainRowComponent implements OnInit {
    @Input() chain: Chain;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
    }

    editChain(chain: any): void {
        this.router.navigate(['./edit', chain.id], {relativeTo: this.route})
    }

}
