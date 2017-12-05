import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-dialog-footer',
    templateUrl: './dialog-footer.component.html',
    styleUrls: ['./dialog-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogFooterComponent implements OnInit {
    @Input() submitButtonText: string;
    @Input() loading: boolean;
    @Input() showDeleteButton: boolean;

    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() close: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    onClose() {
        this.close.next();
    }

    onDelete() {
        this.delete.next();
    }

}
