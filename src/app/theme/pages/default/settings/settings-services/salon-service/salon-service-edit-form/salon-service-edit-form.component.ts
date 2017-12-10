import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EditFormBase} from "../../../edit-form-base";
import {SalonServiceModel} from "../../../../../../../salon-service/salon-service.model";
import {Store} from "@ngrx/store";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import * as fromRoot from "../../../../reducers";
import * as serviceCollectionActions from "../../../../../../../salon-service/actions/collection";
import * as serviceActions from "../../../../../../../salon-service/actions/service";

@Component({
    selector: 'app-salon-service-edit-form',
    templateUrl: './salon-service-edit-form.component.html',
    styleUrls: ['./salon-service-edit-form.component.scss']
})
export class SalonServiceEditFormComponent extends EditFormBase<SalonServiceModel> {
    protected get createTitle() { return 'Добавление услуги'; }
    protected get editTitle() { return 'Редактирование услуги'; }

    @Output() clone = new EventEmitter<any>();

    newPrices: any = {};

    constructor(public activeModal: NgbActiveModal,
                private store: Store<fromRoot.State>) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();

        this.newPrices = {
            date: Date.now(),
            service_id: this.data.id,
            prices: []
        };
    }

    onClose() {
        // TODO: check for changes in form
        this.activeModal.close();
        this.store.dispatch(serviceCollectionActions.collectionActions.FinishOperation());
    }

    onClone() {
        this.clone.next(this.data);
    }

    onSetNewPrices() {
        this.store.dispatch(new serviceActions.SetNewPrices(this.newPrices));
    }

    onCategoryChanged(categoryId) {
        this.data.service_category_id = categoryId;
    }
}
