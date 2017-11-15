import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { Chain } from "../../../../../../chain/chain.model";
import { ChainPriceLevel } from "../../../../../../chain/chain-price-level.model";

@Component({
    selector: 'app-chain-settings',
    templateUrl: './chain-edit-form.component.html',
    styleUrls: ['./chain-edit-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChainEditFormComponent implements OnInit {
    @Input() isCreateDialog: boolean;
    @Input() chain: Chain = new Chain();
    @Input() error: string = '';
    @Output() saveChain = new EventEmitter<any>();
    @Output() deleteChain = new EventEmitter<any>();

    title: string;
    submitButtonText: string;
    canDeleteChain: boolean;

    constructor(
        private router: Router) {
    }

    ngOnInit() {
        this.title = this.isCreateDialog ? 'Новая сеть' : 'Обновить сеть';
        this.submitButtonText = this.isCreateDialog ? 'Сохранить' : 'Обновить';
        this.canDeleteChain = !this.isCreateDialog;
    }

    onSubmit(): void {
        this.saveChain.emit(this.chain);
    }

    onDelete(): void {
        this.deleteChain.emit(this.chain);
    }

    canRemovePriceLevels(): boolean {
        return this.chain.levels.length > 1;
    }

    removePriceLevel(index: number): void {
        this.chain.levels.splice(index, 1);
    }

    addPriceLevel(): void {
        this.chain.levels.push(new ChainPriceLevel());
    }

    goToChains(): void {
        this.router.navigate(['/settings/chains']);
    }

}
