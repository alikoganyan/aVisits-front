import {OnInit} from "@angular/core";
import {Action, MemoizedSelector, Store} from "@ngrx/store";
import {ModalConfig, ModalService} from "../../../../../shared/modal.service";
import * as fromRoot from "../../reducers";
import {NgbActiveModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {UniqueEntity} from "../../../../../entity-collection/unique-entity";
import * as filterReducer from "../../../../../reducers/filter";

export abstract class SettingsMasterViewComponentBase implements OnInit {
    protected operationComplete$: Store<boolean>;
    filterChainId$ = this.store$.select(filterReducer.selectFilterChainId);
    filterSalonId$ = this.store$.select(filterReducer.selectFilterSalonId);

    protected filterChainId: number;
    protected filterSalonId: number;

    protected modal: NgbModalRef;

    protected abstract get operationCompleteSelector(): MemoizedSelector<Object, boolean>;

    abstract loadEntities(): void;

    abstract getModalSize(entity?: UniqueEntity): string;

    abstract getSetCurrentEntityAction(entity: UniqueEntity): Action;

    protected getFetchCurrentEntityAction(entity: UniqueEntity): Action { return null; }

    protected get shouldFetchEntityForEdit(): boolean { return false; }

    constructor(protected store$: Store<fromRoot.State>,
                protected modalService: ModalService,
                protected activeModal: NgbActiveModal,) {
    }

    ngOnInit() {
        this.initializeSelectors();
        this.subscribeToStore();
        this.loadEntities();
    }

    protected initializeSelectors(): void {
        this.operationComplete$ = this.store$.select(this.operationCompleteSelector);
    }

    protected subscribeToStore(): void {
        this.operationComplete$
            .filter(next => next === true)
            .subscribe(
                operationComplete => this.modal && this.modal.close()
            );

        this.filterSalonId$
            .subscribe(salonId => this.filterSalonId = salonId);

        this.filterChainId$
            .subscribe(chainId => this.filterChainId = chainId);
    }

    openModalForm(formComponent: any, entity: UniqueEntity, forEdit: boolean = false): void {
        this.setCurrentEntity(entity, forEdit);

        this.modal = this.modalService.open(
            new ModalConfig(formComponent, {
                size: this.getModalSize(entity)
            })
        );
    }

    setCurrentEntity(entity: UniqueEntity, forEdit: boolean): void {
        let action = this.getSetCurrentEntityAction(entity);
        this.store$.dispatch(action);

        if(forEdit && this.shouldFetchEntityForEdit) {
            this.store$.dispatch(this.getFetchCurrentEntityAction(entity));
        }
    }
}