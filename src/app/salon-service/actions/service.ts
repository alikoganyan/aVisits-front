import {Action} from "@ngrx/store";
import {ActionWithPayload} from "../../shared/interfaces";

export const SET_NEW_PRICES = '[Salon Service] Set New Prices';
export const SET_NEW_PRICES_SUCCESS = '[Salon Service] Set New Prices Success';
export const SET_NEW_PRICES_FAILURE = '[Salon Service] Set New Prices Failure';

export class SetNewPrices implements ActionWithPayload<any> {
    readonly type = SET_NEW_PRICES;

    constructor(public payload: any) {}
}

export class SetNewPricesSuccess implements ActionWithPayload<any> {
    readonly type = SET_NEW_PRICES_SUCCESS;

    constructor(public payload: any) {}
}

export class SetNewPricesFailure implements ActionWithPayload<any> {
    readonly type = SET_NEW_PRICES_FAILURE;

    constructor(public payload: any) {}
}

export type Actions
    = SetNewPrices
    | SetNewPricesSuccess
    | SetNewPricesFailure
    ;