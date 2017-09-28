import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";


@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit, AfterViewInit {

    constructor(private _script: ScriptLoaderService) { }



    ngOnInit() {
    }





    ngAfterViewInit() {
        this._script.load('app-service',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');
        this._script.load('app-service',
            'assets/demo/default/custom/components/datatables/base/data-ajax.js');

    }

}
