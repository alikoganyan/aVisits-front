import {Component, OnInit, AfterViewInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ScriptLoaderService} from "../../../../../_services/script-loader.service";
import {CreateEmployeePositionService} from "../../../../_services/create-employee-position.service";

@Component({
    selector: 'app-employee-position',
    templateUrl: './employee-position.component.html',
    styleUrls: ['./employee-position.component.css']
})
export class EmployeePositionComponent implements OnInit, AfterViewInit {

    constructor(private _script: ScriptLoaderService) {
    }

    ngOnInit() {
    }


    ngAfterViewInit() {
        this._script.load('app-employee-position',
            'assets/demo/default/custom/components/datatables/base/data-ajax-employee-position.js');
    }
}

