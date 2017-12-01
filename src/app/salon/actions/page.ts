import {Salon} from "../salon.model";
import {ActionWithPayload} from "../../shared/interfaces";

export const SET_FILTER_CHAIN_ID = '[Salon Page] Set Filter Chain Id';

/**
 * Set filter
 */
export class SetFilterChainId implements ActionWithPayload<number> {
    readonly type = SET_FILTER_CHAIN_ID;

    constructor(public payload: number) {}
}

export type Actions
    = SetFilterChainId
    ;