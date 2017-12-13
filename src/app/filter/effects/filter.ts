import {Injectable} from "@angular/core";
import {PositionCollectionActions} from "../../position/actions/collection";
import {Actions, Effect} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../theme/pages/default/reducers";
import * as filterActions from "../actions/filter";
import * as fromSalonCollection from "../../theme/pages/default/reducers/salon-collection";
import {Salon} from "../../salon/salon.model";

@Injectable()
export class FilterEffects {

    @Effect()
    setFilterSalonId$ = this.actions$
        .ofType(filterActions.SET_FILTER_SALON_ID)
        .map((action: filterActions.SetFilterSalonId) => action.payload)
        .withLatestFrom(this.store$.select(fromSalonCollection.selectSalonEntities),
            (id, salons) => salons[id]
        )
        .map((salon:Salon) => salon.chain_id)
        .map(chain_id => new filterActions.SetFilterChainId(chain_id));

    constructor(
        protected actions$: Actions,
        protected store$: Store<fromRoot.State>)
    {
    }
}