import {ActionWithPayload} from "../../shared/interfaces";

export const SET_FILTER_CHAIN_ID = '[Filter] Set Chain Id';
export const SET_FILTER_SALON_ID = '[Filter] Set Salon Id';

/**
 * Set filter
 */
export class SetFilterChainId implements ActionWithPayload<number> {
    readonly type = SET_FILTER_CHAIN_ID;

    constructor(public payload: number) {}
}

export class SetFilterSalonId implements ActionWithPayload<number> {
    readonly type = SET_FILTER_SALON_ID;

    constructor(public payload: number) {}
}

export type Actions
    = SetFilterChainId
    | SetFilterSalonId
    ;