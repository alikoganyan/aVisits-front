import {OnInit} from "@angular/core";
import {Action, MemoizedSelector, Store} from "@ngrx/store";
import {ModalConfig, ModalService} from "../../../../../shared/modal.service";
import * as fromRoot from "../../reducers";
import {NgbActiveModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {UniqueEntity} from "../../../../../entity-collection/unique-entity";

export abstract class SettingsMasterViewComponentBase implements OnInit {
    protected operationComplete$: Store<boolean>;

    protected modal: NgbModalRef;

    protected abstract get operationCompleteSelector(): MemoizedSelector<Object, boolean>;

    abstract loadEntities(): void;

    abstract getModalSize(entity?: UniqueEntity): string;

    abstract getSetCurrentEntityAction(entity: UniqueEntity): Action;

    constructor(protected store$: Store<fromRoot.State>,
                protected modalService: ModalService,
                protected activeModal: NgbActiveModal,) {
    }

    ngOnInit() {
        this.loadEntities();
        this.initializeSelectors();
        this.subscribeToStore();
    }

    protected initializeSelectors(): void {
        this.operationComplete$ = this.store$.select(this.operationCompleteSelector);
    }

    protected subscribeToStore(): void {
        this.operationComplete$
            .filter(next => next === true)
            .subscribe(
                operationComplete => this.modal.close()
            );
    }

    openModalForm(formComponent: any, entity: UniqueEntity): void {
        this.setCurrentEntity(entity);

        this.modal = this.modalService.open(
            new ModalConfig(formComponent, {
                size: this.getModalSize(entity)
            })
        );
    }

    setCurrentEntity(entity: UniqueEntity): void {
        let action = this.getSetCurrentEntityAction(entity);
        this.store$.dispatch(action);
    }
}