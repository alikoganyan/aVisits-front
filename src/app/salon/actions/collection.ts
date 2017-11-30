import {Action} from "@ngrx/store";
import {Salon} from "../salon.model";
import {ActionWithPayload} from "../../shared/interfaces";
import {EntityCollectionActions} from "../../entity-collection/entity-collection.actions";


export class SalonCollectionActions extends EntityCollectionActions<Salon> {
    protected get entityName(): string {
        return 'Salon';
    }

    constructor() {
        super();
    }
}

export const collectionActions = new SalonCollectionActions();

// export const SET_CURRENT_SALON = '[Salon Collection] Set Current Salon';
//
// export const LOAD_ALL = '[Salon Collection] Load All';
// export const LOAD_ALL_SUCCESS = '[Salon Collection] Load All Success';
// export const LOAD_ALL_FAILURE = '[Salon Collection] Load All Failure';
//
// export const ADD_SALON = '[Salon Collection] Add Salon';
// export const ADD_SALON_SUCCESS = '[Salon Collection] Add Salon Success';
// export const ADD_SALON_FAILURE = '[Salon Collection] Add Salon Failure';
//
// export const UPDATE_SALON = '[Salon Collection] Update Salon';
// export const UPDATE_SALON_SUCCESS = '[Salon Collection] Update Salon Success';
// export const UPDATE_SALON_FAILURE = '[Salon Collection] Update Salon Failure';
//
// export const REMOVE_SALON = '[Salon Collection] Remove Salon';
// export const REMOVE_SALON_SUCCESS = '[Salon Collection] Remove Salon Success';
// export const REMOVE_SALON_FAILURE = '[Salon Collection] Remove Salon Failure';
//
// export class SetCurrentSalon implements ActionWithPayload<Salon> {
//     readonly type = SET_CURRENT_SALON;
//
//     constructor(public payload: Salon) {}
// }
//
// /**
//  * Load collection
//  */
// export class LoadAll implements Action {
//     readonly type = LOAD_ALL;
// }
//
// export class LoadAllSuccess implements ActionWithPayload<Salon[]> {
//     readonly type = LOAD_ALL_SUCCESS;
//
//     constructor(public payload: Salon[]) {}
// }
//
// export class LoadAllFailure implements ActionWithPayload<any> {
//     readonly type = LOAD_ALL_FAILURE;
//
//     constructor(public payload: any) {}
// }
//
// /**
//  * Add salon
//  */
// export class AddSalon implements ActionWithPayload<Salon> {
//     readonly type = ADD_SALON;
//
//     constructor(public payload: Salon) {}
// }
//
// export class AddSalonSuccess implements ActionWithPayload<Salon> {
//     readonly type = ADD_SALON_SUCCESS;
//
//     constructor(public payload: Salon) {}
// }
//
// export class AddSalonFailure implements ActionWithPayload<any> {
//     readonly type = ADD_SALON_FAILURE;
//
//     constructor(public payload: any) {}
// }
//
// /**
//  * Update salon
//  */
// export class UpdateSalon implements ActionWithPayload<Salon> {
//     readonly type = UPDATE_SALON;
//
//     constructor(public payload: Salon) {}
// }
//
// export class UpdateSalonSuccess implements ActionWithPayload<Salon> {
//     readonly type = UPDATE_SALON_SUCCESS;
//
//     constructor(public payload: Salon) {}
// }
//
// export class UpdateSalonFailure implements ActionWithPayload<Salon> {
//     readonly type = UPDATE_SALON_FAILURE;
//
//     constructor(public payload: Salon) {}
// }
//
// /**
//  * Remove salon
//  */
// export class RemoveSalon implements ActionWithPayload<Salon> {
//     readonly type = REMOVE_SALON;
//
//     constructor(public payload: Salon) {}
// }
//
// export class RemoveSalonSuccess implements ActionWithPayload<number> {
//     readonly type = REMOVE_SALON_SUCCESS;
//
//     constructor(public payload: number) {}
// }
//
// export class RemoveSalonFailure implements ActionWithPayload<any> {
//     readonly type = REMOVE_SALON_FAILURE;
//
//     constructor(public payload: any) {}
// }
//
//
// export type Actions
//     = LoadAll
//     | LoadAllSuccess
//     | LoadAllFailure
//     | AddSalon
//     | AddSalonSuccess
//     | AddSalonFailure
//     | UpdateSalon
//     | UpdateSalonSuccess
//     | UpdateSalonFailure
//     | RemoveSalon
//     | RemoveSalonSuccess
//     | RemoveSalonFailure
//     | SetCurrentSalon
//
// ;