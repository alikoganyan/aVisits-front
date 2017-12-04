import {OnInit} from "@angular/core";
import * as fromRoot from '../../reducers';
import {Action, MemoizedSelector, Selector, Store} from "@ngrx/store";
import {NgbActiveModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfig, ModalService} from "../../../../../shared/modal.service";
import {UniqueEntity} from "../../../../../entity-collection/unique-entity";
import {EntityCollectionActions} from "../../../../../entity-collection/entity-collection.actions";


export abstract class SettingsMasterViewComponent<T extends UniqueEntity> implements OnInit {

    /**
     * store actions & selectors
     */
    protected abstract get operationCompleteSelector(): MemoizedSelector<Object, boolean>;

    protected abstract get entitiesSelector(): MemoizedSelector<Object, any>;

    protected abstract createEntityInstance(): T;

    /**
     * abstract properties
     */
    protected abstract get entityCollectionActions(): EntityCollectionActions<T>;

    protected abstract get modalSize(): string;

    protected abstract get createEntityComponent();

    protected abstract get editEntityComponent();
    /**
     * properties
     */
    protected operationComplete$: Store<boolean>;
    public entities$: Store<any>;

    protected modal: NgbModalRef;


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
        this.entities$ = this.store$.select(this.entitiesSelector);
        this.operationComplete$ = this.store$.select(this.operationCompleteSelector);
    }

    protected subscribeToStore(): void {
        this.operationComplete$
            .filter(next => next === true)
            .subscribe(
                operationComplete => this.modal.close()
            );
    }

    protected loadEntities(): void {
        this.store$.dispatch(this.entityCollectionActions.LoadAll());
    }

    openModalForm(formComponent: any, entity: UniqueEntity): void {
        this.store$.dispatch(this.entityCollectionActions.SetCurrentEntity(entity));
        this.modal = this.modalService.open(
            new ModalConfig(formComponent, {
                size: this.modalSize
            })
        );
    }

    openCreateForm(): void {
        this.openModalForm(this.createEntityComponent, this.createEntityInstance());
    }

    openEditForm(entity: T): void {
        this.openModalForm(this.editEntityComponent, entity);
    }

}