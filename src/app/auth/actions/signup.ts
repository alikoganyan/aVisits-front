import {Action} from "@ngrx/store";
import {RegisterInfo} from "../_models/user";

export const SUBMIT_REGISTER_INFO = '[Signup] Submit info';
export const SUBMIT_REGISTER_SUCCESS = '[Signup] Submit Success';
export const SUBMIT_REGISTER_FAILURE = '[Signup] Submit Failure';

export class SubmitRegisterInfo implements Action {
    readonly type = SUBMIT_REGISTER_INFO;
    //new user data
    constructor(public payload: RegisterInfo) {}
}

export class SubmitRegisterInfoSuccess implements Action {
    readonly type = SUBMIT_REGISTER_SUCCESS;

    constructor(public payload: any) {
        console.log('register success', payload)
    }
}

export class SubmitRegisterInfoFailure implements Action {
    readonly type = SUBMIT_REGISTER_FAILURE;

    constructor(public payload: any) {}
}

export type Actions
    = SubmitRegisterInfo
    | SubmitRegisterInfoSuccess
    | SubmitRegisterInfoFailure