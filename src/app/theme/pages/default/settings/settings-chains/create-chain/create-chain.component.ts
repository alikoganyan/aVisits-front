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
    saveSuccessful: boolean = false;
    errors: any;

    constructor(private chainService: ChainService) {
        this.chain = new Chain();
        this.chain.levels.push(new ChainPriceLevel('Цена'));
    }

    ngOnInit() {
    }

    onSaveChain(chain: any): void {
        console.log("onsavechain", chain)
        this.chainService
            .createChain(chain)
            .subscribe(
                data => this.onSaveReceived(data.json()),
                error => this.onError(error)
            )
    }

    onSaveReceived(data: any) {
        console.log(data)
        if(data['ValidationError']) {
            this.onError(data['ValidationError']);
        }
        else {
            this.onSuccessfulSave();
        }
    }

    onSuccessfulSave(): void {
        (<any>$("#modalDialog")).modal('hide');
        // ModalDialogComponent.hide();
        this.saveSuccessful = true;
    }

    onError(data): void {
        this.errors = data.description;
    }

    onDeleteChain(chain: any): void {
    }
}
