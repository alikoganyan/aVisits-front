import {Action} from "@ngrx/store";
import {Credentials, UserChain} from "../_models/user";

export const SUBMIT_CREDENTIALS = '[Auth] Submit Credentials';
export const SUBMIT_CREDENTIALS_SUCCESS = '[Auth] Submit Credentials Success';
export const SUBMIT_CREDENTIALS_FAILURE = '[Auth] Submit Credentials Failure';

export const SELECT_CHAIN_REDIRECT = '[Auth] Select Chain Redirect';
export const SELECT_CHAIN = '[Auth] Select Chain';
export const SELECT_THE_ONLY_CHAIN = '[Auth] Select The Only Chain';

export const SUBMIT_PASSWORD = '[Auth] Submit Password';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';

export const LOGIN_REDIRECT = '[Auth] Login Redirect';
export const INDEX_REDIRECT = '[Auth] Index Redirect';

export const LOGOUT = '[Auth] Logout';


export class SubmitCredentials implements Action {
    readonly type = SUBMIT_CREDENTIALS;

    constructor(public payload: Credentials) {}
}

export class SubmitCredentialsSuccess implements Action {
    readonly type = SUBMIT_CREDENTIALS_SUCCESS;
    //chains
    constructor(public payload: any) {
    }
}

export class SubmitCredentialsFailure implements Action {
    readonly type = SUBMIT_CREDENTIALS_FAILURE;

    constructor(public payload: any) {}
}

/*
 Select chain
 */
export class NavigateToSelectChain implements Action {
    readonly type = SELECT_CHAIN_REDIRECT;
}

export class SelectChain implements Action {
    readonly type = SELECT_CHAIN;

    constructor(public payload: number) {}
}

export class SelectTheOnlyChain implements Action {
    readonly type = SELECT_THE_ONLY_CHAIN;
}

/*
Submit password
 */
export class SubmitPassword implements Action {
    readonly type = SUBMIT_PASSWORD;

    constructor(public payload: string) {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;

    // user info, token
    constructor(public payload: any) {}
}

export class LoginFailure implements Action {
    readonly type = LOGIN_FAILURE;

    constructor(public payload: any) {}
}

export class IndexRedirect implements Action {
    readonly type = INDEX_REDIRECT;
}

export class LoginRedirect implements Action {
    readonly type = LOGIN_REDIRECT;
}

export class Logout implements Action {
    readonly type = LOGOUT;
}


export type Actions
    = SubmitCredentials
    | SubmitCredentialsSuccess
    | SubmitCredentialsFailure
    | NavigateToSelectChain
    | SelectChain
    | SelectTheOnlyChain
    | SubmitPassword
    | LoginSuccess
    | LoginFailure
    | LoginRedirect
    | Logout;


