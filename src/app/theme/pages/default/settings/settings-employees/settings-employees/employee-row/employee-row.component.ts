import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from "../../../../../../../employee/employee.model";

@Component({
    selector: 'app-employee-row',
    templateUrl: './employee-row.component.html',
    styleUrls: ['./employee-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeRowComponent implements OnInit {
    @Input() employee: Employee;
    @Output() editEmployeeRequested = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    editEmployee(): void {
        this.editEmployeeRequested.next(this.employee);
    }

}
