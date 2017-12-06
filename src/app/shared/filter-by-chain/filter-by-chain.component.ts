import {Component, Input, OnInit} from '@angular/core';
import * as chainActions from "../../chain/actions/collection";
import * as fromRoot from "../../theme/pages/default/reducers";
import {Store} from "@ngrx/store";
import * as filterActions from "../../filter/actions/filter";
import * as fromFilter from "../../theme/pages/default/reducers/filter";
import * as filterReducer from "../../reducers/filter";

@Component({
    selector: 'app-filter-by-chain',
    templateUrl: './filter-by-chain.component.html',
    styleUrls: ['./filter-by-chain.component.scss']
})
export class FilterByChainComponent implements OnInit {
    @Input() showSelectAll: boolean = false;

    dataSource$: Store<any>;
    selectedChainId$ = this.store$.select(filterReducer.selectFilterChainId);

    constructor(private store$: Store<fromRoot.State>) {
    }

    ngOnInit() {
        this.store$.dispatch(chainActions.collectionActions.LoadAll());

        let selector = this.showSelectAll
            ? fromFilter.selectFilterByChainExtendedDataSource
            : fromFilter.selectFilterByChainDataSource;

        this.dataSource$ = this.store$.select(selector);
    }

    onFilterChanged(chainId: number): void {
        this.store$.dispatch(new filterActions.SetFilterChainId(chainId));
    }
}
