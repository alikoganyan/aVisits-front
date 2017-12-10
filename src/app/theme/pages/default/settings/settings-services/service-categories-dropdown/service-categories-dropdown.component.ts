import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../reducers";
import * as fromCategory from "../../../reducers/service-category";
import {DxTreeViewComponent} from "devextreme-angular";

@Component({
    selector: 'app-service-categories-dropdown',
    templateUrl: './service-categories-dropdown.component.html',
    styleUrls: ['./service-categories-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceCategoriesDropdownComponent implements OnInit {
    @ViewChild(DxTreeViewComponent) treeView;

    @Input() value: any;
    @Input() showNoCategoryOption: boolean = false;
    @Output() valueChanged = new EventEmitter<any>();

    categories$: any;

    constructor(private store$: Store<fromRoot.State>) {
    }

    ngOnInit() {
        let selector = this.showNoCategoryOption
            ? fromCategory.selectServiceCategoriesExtendedDataSource
            : fromCategory.selectServiceCategoriesDataSource;

        this.categories$ = this.store$.select(selector);
    }

    categoryTreeView_itemSelectionChanged(e) {
        let selectedId = e.itemData.id;

        if(selectedId !== this.value) {
            this.valueChanged.emit(selectedId);
        }
    }

    dropDown_onValueChanged(e) {
        this.syncTreeViewSelection(e.value);
    }

    syncTreeViewSelection(value) {
        if(!this.treeView) return;

        if(!value) {
            this.treeView.instance.unselectAll();
        }
        else {
            this.treeView.instance.selectItem(value);
        }
    }
}
