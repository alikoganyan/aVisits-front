import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";

declare let Dropzone: any;
@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, AfterViewInit {
    showFiredEmployee = false;
    radioButtonChackDays = 'byShifts';
    showWeekdays: boolean[] = [false, false, false, false, false, false, false];





    constructor(private _script: ScriptLoaderService) {
    }

    onChane() {
        this._script.load('app-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-select.js');
    }


    ngOnInit() {
    }

    onAddWorkTime() {

    }

    onShowFieldEmployee(event) {
        event.target.checked ? this.showFiredEmployee = true : this.showFiredEmployee = false;
        this._script.load('app-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');
    }

    onChangeDays(choice: string) {
        this.radioButtonChackDays = choice;
        this._script.load('app-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-select.js');
        this._script.load('app-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-touchspin.js');
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
