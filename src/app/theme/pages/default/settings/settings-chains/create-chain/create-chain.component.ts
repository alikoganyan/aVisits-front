import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChainService} from "../../../../../../chain/chain.service";
import {Chain} from "../../../../../../chain/chain.model";
import {ChainPriceLevel} from "../../../../../../chain/chain-price-level.model";

@Component({
    selector: 'app-create-chain',
    templateUrl: './create-chain.component.html',
    styleUrls: ['./create-chain.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateChainComponent implements OnInit {
    chain: Chain;
    //TODO: show toaster
    saveSuccessful: boolean = false;
    errors: any;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private chainService: ChainService) {
        this.chain = new Chain();
        this.chain.levels.push(new ChainPriceLevel('Цена'));
    }

    ngOnInit() {
    }

    onSaveChain(chain: any): void {
        this.chainService
            .createChain(chain)
            .subscribe(
                data => this.saveSuccessful = true,
                error => this.errors = error
            )

    }
}
