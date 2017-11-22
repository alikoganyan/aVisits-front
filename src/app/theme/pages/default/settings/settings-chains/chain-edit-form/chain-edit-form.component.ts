import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { Chain } from "../../../../../../chain/chain.model";
import { ChainPriceLevel } from "../../../../../../chain/chain-price-level.model";
import {EditFormBase} from "../../edit-form-base";

@Component({
    selector: 'app-chain-settings',
    templateUrl: './chain-edit-form.component.html',
    styleUrls: ['./chain-edit-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChainEditFormComponent extends EditFormBase<Chain> {
    canDeleteChain: boolean;

    protected get createTitle() { return 'Новая сеть'; }
    protected get editTitle() { return 'Обновить сеть'; }

    constructor() {
        super();
    }

    canRemovePriceLevels(): boolean {
        return this.data.levels.length > 1;
    }

    removePriceLevel(index: number): void {
        this.data.levels.splice(index, 1);
    }

    addPriceLevel(): void {
        this.data.levels.push(new ChainPriceLevel());
    }
}
