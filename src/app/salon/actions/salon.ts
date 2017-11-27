import {Action} from "@ngrx/store";
import {ActionWithPayload} from "../../shared/interfaces";
import {Salon} from "../salon.model";

export const LOAD = '[Salon] Load';
export const LOAD_SUCCESS = '[Salon] Load Success';
export const LOAD_FAILURE = '[Salon] Load Failure';

/**
 * Load salon
 */
export class Load implements ActionWithPayload<number> {
    readonly type = LOAD;

    constructor(public payload: number) {}
}

export class LoadSuccess implements ActionWithPayload<Salon> {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: Salon) {}
}

export class LoadFailure implements ActionWithPayload<any> {
    readonly type = LOAD_FAILURE;

    constructor(public payload: any) {}
}

export type Actions
    = Load
    | LoadSuccess
    | LoadFailure

;