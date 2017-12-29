import {OnInit} from "@angular/core";
import * as fromRoot from '../../reducers';
import {Action, MemoizedSelector, Selector, Store} from "@ngrx/store";
import {NgbActiveModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfig, ModalService} from "../../../../../shared/modal.service";
import {UniqueEntity} from "../../../../../entity-collection/unique-entity";
import {EntityCollectionActions} from "../../../../../entity-collection/entity-collection.actions";
import {SettingsMasterViewComponentBase} from "./settings-master-view-component-base";


export abstract class SettingsMasterViewComponent<T extends UniqueEntity> extends SettingsMasterViewComponentBase {

    /**
     * store actions & selectors
     */
    protected abstract get entitiesSelector(): MemoizedSelector<Object, any>;

    protected abstract createEntityInstance(): T;

    protected getLoadEntitiesArgs(): any {
        return this.filterChainId;
    }

    protected getFetchCurrentEntityAction(entity: UniqueEntity): Action {
        return this.entityCollectionActions.LoadEntity(entity);
    }
    /**
     * abstract properties
     */
    protected abstract get entityCollectionActions(): EntityCollectionActions<T>;

    protected abstract get createEntityComponent();

    protected abstract get editEntityComponent();
    /**
     * properties
     */

    public entities$: Store<any>;


    initializeSelectors(): void {
        super.initializeSelectors();

        this.entities$ = this.store$.select(this.entitiesSelector);
    }

    loadEntities(): void {
        let args = this.getLoadEntitiesArgs();
        this.store$.dispatch(this.entityCollectionActions.LoadAll(args));
    }

    getSetCurrentEntityAction(entity: T): Action {
        return this.entityCollectionActions.SetCurrentEntity(entity);
    }

    openCreateForm(): void {
        this.openModalForm(this.createEntityComponent, this.createEntityInstance());
    }

    openEditForm(entity: T): void {
        this.openModalForm(this.editEntityComponent, entity, true);
    }

}