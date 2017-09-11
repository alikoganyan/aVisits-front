import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";

@Component({
    selector: 'app-record-view-table',
    templateUrl: './record-view-table.component.html',
    styleUrls: ['./record-view-table.component.css']
})
export class RecordViewTableComponent implements OnInit, AfterViewInit {

    constructor(private _script: ScriptLoaderService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this._script.load('app-record-view-table',
            'assets/demo/default/custom/components/datatables/base/data-ajax.js');

    }


}
