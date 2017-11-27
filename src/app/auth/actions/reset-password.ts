import {Action} from "@ngrx/store";

export const LOAD_CREDENTIALS = '[Reset Password] Load Credentials';
export const SUBMIT_NEW_PASSWORD = '[Reset Password] Submit New Password';

export class LoadCredentials implements Action {
    readonly type = LOAD_CREDENTIALS;
    //new user data
    constructor(public payload: any) {}
}

export class SubmitNewPassword implements Action {
    readonly type = SUBMIT_NEW_PASSWORD;

    constructor(public payload: any) {}
}


export type Actions
    = LoadCredentials
    | SubmitNewPassword