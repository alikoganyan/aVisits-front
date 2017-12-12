import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as fromRoot from "../../../../theme/pages/default/reducers";
import {Store} from "@ngrx/store";
import * as fromFilter from "../../../../theme/pages/default/reducers/filter";
import * as filterReducer from "../../../../reducers/filter";
import * as filterActions from "../../../../filter/actions/filter";

@Component({
    selector: 'app-salon-filter-dropdown',
    templateUrl: './salon-filter-dropdown.component.html',
    styleUrls: ['./salon-filter-dropdown.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalonFilterDropdownComponent implements OnInit {

    filterDataSource$ = this.store$.select(fromFilter.selectGlobalFilterDataSource);
    selectedChainId$ = this.store$.select(filterReducer.selectFilterChainId);
    selectedSalonTitle$ = this.store$.select(filterReducer.selectFilterSalon)
        .do(console.log)
        .map(s => s ? s.title : 'Выберите салон');

    constructor(private store$: Store<fromRoot.State>) {
    }

    ngOnInit() {
    }

    setFilter(salon: any) {
        this.store$.dispatch(new filterActions.SetFilterChainId(salon.chain_id));
        this.store$.dispatch(new filterActions.SetFilterSalonId(salon.id));
    }
}
