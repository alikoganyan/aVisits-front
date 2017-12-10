import {OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Action, Store} from "@ngrx/store";
import * as fromService from "../../../../reducers/salon-service";
import * as fromRoot from "../../../../reducers";
import * as serviceActions from "../../../../../../../salon-service/actions/collection";
import {SalonServiceModel} from "../../../../../../../salon-service/salon-service.model";

export abstract class SalonServiceDialogBaseComponent implements OnInit {
    service$ = this.store$.select(fromService.selectCurrentService);
    error$ = this.store$.select(fromService.selectError);
    loading$ = this.store$.select(fromService.selectLoading);

    constructor(protected store$: Store<fromRoot.State>) {
    }

    protected abstract createSaveAction(service: SalonServiceModel): Action;

    ngOnInit() {
    }

    onSaveService(service: SalonServiceModel) {
        this.store$.dispatch(this.createSaveAction(service));
    }

    onDeleteService(service: SalonServiceModel) {
        this.store$.dispatch(serviceActions.collectionActions.RemoveEntity(service));
    }

    onCloneService(service: SalonServiceModel) {
        let clone = { ...service, id: null };
        this.store$.dispatch(serviceActions.collectionActions.AddEntity(clone));
    }
}