import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {ModalService} from "../modal.service";
import * as Layout from '../actions/layout';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

// @Injectable()
// export class LayoutEffects {
//     @Effect({dispatch: false})
//     openModal$ = this.actions$
//         .ofType(Layout.OPEN_MODAL)
//         .map((action: Layout.OpenModal) => action.payload)
//         .map((modalConfig) => this.modalService.open(modalConfig));
//
//     @Effect({ dispatch: false })
//     closeModal$ = this.actions$
//         .ofType(Layout.CLOSE_MODAL)
//         .do(() => this.activeModal.close());
//
//
//     constructor(private actions$: Actions,
//                 private modalService: ModalService,
//                 public activeModal: NgbActiveModal) {
//     }
// }