import {Component, OnInit} from '@angular/core';
import * as fromRoot from '../../../reducers';
import * as fromPosition from '../../../reducers/positions';
import * as positionActions from '../../../../../../position/actions/collection';
import {Store} from "@ngrx/store";
import {EmployeePosition} from "../../../../../../position/position.model";

export abstract class PositionDialogBase implements OnInit {
    position$ = this.store$.select(fromPosition.selectCurrentPosition);
    error$ = this.store$.select(fromPosition.selectError);
    loading$ = this.store$.select(fromPosition.selectLoading);

    protected abstract createSaveAction(position: EmployeePosition);

    constructor(protected store$: Store<fromRoot.State>) {
    }

    ngOnInit() {
    }

    onSavePosition(position: EmployeePosition) {
        debugger
        this.store$.dispatch(this.createSaveAction(position));
    }

    onDeletePosition(position: EmployeePosition): void {
        this.store$.dispatch(positionActions.collectionActions.RemoveEntity(position));
    }
}
