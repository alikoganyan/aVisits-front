import {EventEmitter, Input, OnInit, Output} from "@angular/core";

export abstract class EditFormBase<T> implements OnInit {
    @Input() isCreateForm: boolean;
    @Input() data: any;
    @Input() error: any;
    @Output() save = new EventEmitter<T>();
    @Output() deleteRequested = new EventEmitter<T>();

    // static metaData = {
    //     inputs: ['isCreateForm', 'data'],
    //     outputs: ['save']
    // };

    title: string;
    submitButtonText: string;
    protected abstract get createTitle()
    protected abstract get editTitle()

    ngOnInit() {
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
