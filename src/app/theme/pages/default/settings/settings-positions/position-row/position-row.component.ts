import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmployeePosition} from "../../../../../../position/position.model";

@Component({
    selector: 'app-position-row',
    templateUrl: './position-row.component.html',
    styleUrls: ['./position-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionRowComponent implements OnInit {
    @Input() employeePosition: EmployeePosition;
    @Output() editPositionRequested = new EventEmitter<EmployeePosition>();

    constructor() {
    }

    ngOnInit() {
    }

    editPosition() {
        this.editPositionRequested.next(this.employeePosition);
    }
}
