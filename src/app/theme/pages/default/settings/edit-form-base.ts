import {EventEmitter, Input, OnInit, Output} from "@angular/core";
import _ = require("lodash");

export abstract class EditFormBase<T> implements OnInit {
    @Input() isCreateForm: boolean;
    @Input() currentEntity: any;
    @Input() error: any;
    @Input() loading: boolean;
    @Output() save = new EventEmitter<T>();
    @Output() deleteRequested = new EventEmitter<T>();

    // static metaData = {
    //     inputs: ['isCreateForm', 'data'],
    //     outputs: ['save']
    // };
    data: any;

    title: string;
    submitButtonText: string;
    protected abstract get createTitle()
    protected abstract get editTitle()

    ngOnInit() {
        this.data = _.cloneDeep(this.currentEntity);
        this.title = this.isCreateForm ? this.createTitle : this.editTitle;
        this.submitButtonText = this.isCreateForm ? 'Сохранить' : 'Обновить';
    }

    onSubmit(): void {
        this.save.emit(this.data);
    }

    onDelete(): void {
        if(confirm(`Вы действительно хотите удалить ${this.data.title}?`)) {
            this.deleteRequested.emit(this.data);
        }
    }

}
