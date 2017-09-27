import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";

declare let Dropzone: any;
@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, AfterViewInit {
    showFieldEmployee = false;
    radioButtonChackDays = 'byShifts';
    workDaysIntervals = [];

    constructor(private _script: ScriptLoaderService) {
    }

    ngOnInit() {
    }

    onAddWorkTime() {

    }

    onShowFieldEmployee(event) {
        event.target.checked ? this.showFieldEmployee = true : this.showFieldEmployee = false;
        console.log(this.showFieldEmployee);
    }

    onChangeDays(choice: string) {
        this.radioButtonChackDays = choice;
        this.ngAfterViewInit();
    }

    onShowWorkInterval(a, b) {
        console.log(a);
        console.log(b);
    }

    ngAfterViewInit() {
        this._script.load('app-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');
        this._script.load('app-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-touchspin.js');
        this._script.load('app-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-select.js');
        this._script.load('app-employee',
            'assets/demo/default/custom/components/forms/widgets/dropzone.js');
        Dropzone._autoDiscoverFunction();
    }


}
