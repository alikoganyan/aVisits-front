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
    modal = '';

    constructor(private _script: ScriptLoaderService,
                private createEmployeePositionService: CreateEmployeePositionService) {
    }

    ngOnInit() {
    }

    onSubmit(form: NgForm) {
        // console.log(form.value.id, form.value.title, form.value.description);
        console.log(form.value);
        form.reset();
        this.createEmployeePositionService.createPosition(form.value.title, form.value.description)
            .subscribe(
                (position) => {
                    if (position.status == "OK") {
                        this.modal = "modal";
                        console.log("Success");
                        form.reset();
                    }
                }
            )
    }


    ngAfterViewInit() {
        this._script.load('app-employee-position',
            'assets/demo/default/custom/components/datatables/base/data-ajax-employee-position.js');
    }
}
