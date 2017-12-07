import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { Chain } from "../../../../../../chain/chain.model";
import { ChainPriceLevel } from "../../../../../../chain/chain-price-level.model";
import {EditFormBase} from "../../edit-form-base";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as fromRoot from "../../../reducers";
import * as fromAuth from "../../../../../../auth/reducers/index";
import * as chainActions from '../../../../../../chain/actions/collection';
import {createSelector, Store} from "@ngrx/store";
import {ImageSrcPipe} from "../../../../../../shared/pipes/image-src.pipe";

@Component({
    selector: 'app-chain-settings',
    templateUrl: './chain-edit-form.component.html',
    styleUrls: ['./chain-edit-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChainEditFormComponent extends EditFormBase<Chain> {

    protected get createTitle() { return 'Новая сеть'; }
    protected get editTitle() { return 'Обновить сеть'; }

    imageSrc: string;
    token$ = this.store.select(fromAuth.getToken);

    constructor(public activeModal: NgbActiveModal,
                private store: Store<fromRoot.State>) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();

        this.imageSrc = new ImageSrcPipe().transform(this.data.img);
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

    onClose() {
        // TODO: check for changes in form
        this.activeModal.close();
        this.store.dispatch(chainActions.collectionActions.FinishOperation());
    }

    onImageUploaded(e) {
        let responseData = JSON.parse(e.request.response);

        this.data.img = responseData.data['fileName'];
        this.imageSrc = new ImageSrcPipe().transform(responseData.data['path']);
    }
}
