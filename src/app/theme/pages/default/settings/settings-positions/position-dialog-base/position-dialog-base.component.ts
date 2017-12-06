import {Component, OnInit} from '@angular/core';
import * as fromRoot from '../../../reducers';
import * as fromPosition from '../../../reducers/positions';
import * as positionActions from '../../../../../../position/actions/collection';
import {Store} from "@ngrx/store";
import {EmployeePosition} from "../../../../../../position/position.model";
import {Subscription} from "rxjs/Subscription";
import * as filterReducer from "../../../../../../reducers/filter";

export abstract class PositionDialogBase implements OnInit {
    position$ = this.store$.select(fromPosition.selectCurrentPosition);
    error$ = this.store$.select(fromPosition.selectError);
    loading$ = this.store$.select(fromPosition.selectLoading);

    selectedChainId: number;
    selectedChainIdSubscription: Subscription;


    protected abstract createSaveAction(position: EmployeePosition);

    constructor(protected store$: Store<fromRoot.State>) {
    }

    ngOnInit() {
        this.selectedChainIdSubscription = this.store$.select(filterReducer.selectFilterChainId)
            .subscribe(
                next => this.selectedChainId = next
            );
    }

    onSavePosition(position: EmployeePosition) {
        position.chain_id = this.selectedChainId;
        this.store$.dispatch(this.createSaveAction(position));
    }

    onDeletePosition(position: EmployeePosition): void {
        this.store$.dispatch(positionActions.collectionActions.RemoveEntity(position));
    }
}
