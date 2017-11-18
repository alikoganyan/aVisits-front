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
    // @Input() isCreateDialog: boolean;
    // @Input() chain: Chain = new Chain();
    // @Input() error: string = '';
    // @Output() saveChain = new EventEmitter<any>();
    // @Output() deleteChain = new EventEmitter<any>();

    // title: string;
    // submitButtonText: string;
    canDeleteChain: boolean;
    // chain: Chain; //= this.obj;

    protected get createTitle() { return 'Новая сеть'; }
    protected get editTitle() { return 'Обновить сеть'; }

    constructor(
        private router: Router) {

        super();


    }

    // ngOnInit() {
    //     super.ngOnInit()
    //     console.log(this.data)
    // }

    // ngOnInit() {
        // this.title = this.isCreateDialog ? 'Новая сеть' : 'Обновить сеть';
        // this.submitButtonText = this.isCreateDialog ? 'Сохранить' : 'Обновить';
        // this.canDeleteChain = !this.isCreateDialog;
    // }

    // onSubmit(): void {
    //     this.saveChain.emit(this.chain);
    // }

    // onDelete(): void {
    //     this.deleteChain.emit(this.chain);
    // }

    canRemovePriceLevels(): boolean {
        return this.data.levels.length > 1;
    }

    removePriceLevel(index: number): void {
        this.data.levels.splice(index, 1);
    }

    addPriceLevel(): void {
        this.data.levels.push(new ChainPriceLevel());
    }

    // goToChains(): void {
    //     this.router.navigate(['/settings/chains']);
    // }

}
