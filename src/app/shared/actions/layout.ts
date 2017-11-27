import {ActionWithPayload} from "../interfaces";
import {ModalConfig} from "../modal.service";
import {Action} from "@ngrx/store";

export const OPEN_MODAL = '[Layout] Open Modal';
export const CLOSE_MODAL = '[Layout] Close Modal';



export class OpenModal implements ActionWithPayload<ModalConfig> {
    readonly type = OPEN_MODAL;

    constructor(public payload: ModalConfig) {}
}

export class CloseModal implements Action {
    readonly type = CLOSE_MODAL;
}

export type Actions = OpenModal | CloseModal;