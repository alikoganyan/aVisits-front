import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from "../../../../../../_services/script-loader.service";

@Component({
    selector: 'app-record-form',
    templateUrl: './record-form.component.html',
    styleUrls: ['./record-form.component.css']
})
export class RecordFormComponent implements OnInit, AfterViewInit {

    constructor(private _script: ScriptLoaderService) {

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this._script.load('app-record-form',
            'assets/demo/default/custom/components/forms/widgets/input-mask.js');
        this._script.load('app-record-form',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-select.js');
        this._script.load('app-record-form',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');
        this._script.load('app-record-form',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-timepicker-salon.js');

    }

}
