import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, AfterViewInit {
    workDaysCount = 1;
    constructor(private _script: ScriptLoaderService) { }

    ngOnInit() {
    }

    onAddWorkTime() {

    }

    ngAfterViewInit() {
        this._script.load('app-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');
        this._script.load('app-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-touchspin.js');
        this._script.load('app-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-select.js');
    }


}
