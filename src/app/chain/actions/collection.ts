import {Action} from "@ngrx/store";
import {Chain} from "../chain.model";
import {ActionWithPayload} from "../../shared/interfaces";

export const SET_CURRENT_CHAIN = '[Chain Collection] Set Current Chain';
export const LOAD_ALL = '[Chain Collection] Load All';
export const LOAD_ALL_SUCCESS = '[Chain Collection] Load All Success';
export const LOAD_ALL_FAILURE = '[Chain Collection] Load All Failure';

export const ADD_CHAIN = '[Chain Collection] Add Chain';
export const ADD_CHAIN_SUCCESS = '[Chain Collection] Add Chain Success';
export const ADD_CHAIN_FAILURE = '[Chain Collection] Add Chain Failure';

export const UPDATE_CHAIN = '[Chain Collection] Update Chain';
export const UPDATE_CHAIN_SUCCESS = '[Chain Collection] Update Chain Success';
export const UPDATE_CHAIN_FAILURE = '[Chain Collection] Update Chain Failure';

export const REMOVE_CHAIN = '[Chain Collection] Remove Chain';
export const REMOVE_CHAIN_SUCCESS = '[Chain Collection] Remove Chain Success';
export const REMOVE_CHAIN_FAILURE = '[Chain Collection] Remove Chain Failure';


export class SetCurrentChain implements ActionWithPayload<Chain> {
    readonly type = SET_CURRENT_CHAIN;

    constructor(public payload: Chain) {}
}

/**
 * Load collection
 */
export class LoadAll implements Action {
    readonly type = LOAD_ALL;
}

export class LoadAllSuccess implements ActionWithPayload<Chain[]> {
    readonly type = LOAD_ALL_SUCCESS;

    constructor(public payload: Chain[]) {}
}

export class LoadAllFailure implements ActionWithPayload<any> {
    readonly type = LOAD_ALL_FAILURE;

    constructor(public payload: any) {}
}

/**
 * Add chain
 */
export class AddChain implements ActionWithPayload<Chain> {
    readonly type = ADD_CHAIN;

    constructor(public payload: Chain) {}
}

export class AddChainSuccess implements ActionWithPayload<Chain> {
    readonly type = ADD_CHAIN_SUCCESS;

    constructor(public payload: Chain) {}
}

export class AddChainFailure implements ActionWithPayload<any> {
    readonly type = ADD_CHAIN_FAILURE;

    constructor(public payload: any) {}
}

/**
 * Update chain
 */
export class UpdateChain implements ActionWithPayload<Chain> {
    readonly type = UPDATE_CHAIN;

    constructor(public payload: Chain) {}
}

export class UpdateChainSuccess implements ActionWithPayload<Chain> {
    readonly type = UPDATE_CHAIN_SUCCESS;

    constructor(public payload: Chain) {}
}

export class UpdateChainFailure implements ActionWithPayload<Chain> {
    readonly type = UPDATE_CHAIN_FAILURE;

    constructor(public payload: Chain) {}
}

/**
 * Remove chain
 */
export class RemoveChain implements ActionWithPayload<number> {
    readonly type = REMOVE_CHAIN;

    constructor(public payload: number) {}
}

export class RemoveChainSuccess implements ActionWithPayload<number> {
    readonly type = REMOVE_CHAIN_SUCCESS;

    constructor(public payload: number) {}
}

export class RemoveChainFailure implements ActionWithPayload<Chain> {
    readonly type = REMOVE_CHAIN_FAILURE;

    constructor(public payload: Chain) {}
}

export type Actions
    = SetCurrentChain
    | LoadAll
    | LoadAllSuccess
    | LoadAllFailure
    // | Load
    // | LoadSuccess
    // | LoadFailure
    | AddChain
    | AddChainSuccess
    | AddChainFailure
    | UpdateChain
    | UpdateChainSuccess
    | UpdateChainFailure
    | RemoveChain
    | RemoveChainSuccess

    ;
