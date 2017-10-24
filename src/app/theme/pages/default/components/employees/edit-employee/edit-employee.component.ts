import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { EmployeeService } from "../../../../../_services/employee.service";
import { CreateEmployeePositionService } from "../../../../../_services/create-employee-position.service";
import { ScriptLoaderService } from "../../../../../../_services/script-loader.service";

@Component({
    selector: 'app-edit-employee',
    templateUrl: 'edit-employee.component.html',
    styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit, OnDestroy, AfterViewInit {

    userId: number;
    paramsSubscription: Subscription;
    employee = {
        last_name: '',
        first_name: '',
        father_name: '',
        position_id: 0,
        phone: null,
        email: '',
        id: 0
    };
    positions = [];
    showFiredEmployee = false;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private employeeService: EmployeeService,
        private createEmployeePositionService: CreateEmployeePositionService,
        private _script: ScriptLoaderService) {
    }

    onShowFiredEmployee(event) {
        event.target.checked ? this.showFiredEmployee = true : this.showFiredEmployee = false;
        this._script.load('app-edit-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');
    }

    backToAllEmployees() {
        this.router.navigate(['/components/employees/employees-main'], { relativeTo: this.route })
    }

    getEmployee() {
        this.employeeService.getEmployee(this.userId)
            .subscribe(
            (response) => {
                this.employee = response.data.employee;
            }
            )
    }

    ngOnInit() {
        this.paramsSubscription = this.route.params
            .subscribe(
            (params: Params) => {
                this.userId = params['id']
            }
            );
        this.getPositions();
        this.getEmployee();
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }


    getPositions() {
        this.createEmployeePositionService.getPositions()
            .subscribe(
            (response) => {
                this.positions = response.data;
            }
            )
    }

    onSubmit(form: NgForm) {
        console.log(form.value);
        this.employeeService.editEmployee(form.value, this.employee.id)
            .subscribe(
            (response) => {
                console.log(response);
                console.log(response.status);
                if (response.status == 'OK') {
                    this.router.navigate(['/components/employees/employees-main'], { relativeTo: this.route })
                }
            }
            )
    }

    onDeleteEmployee(id: number) {
        this.employeeService.deleteEmployee(id)
            .subscribe(
            (response) => {
                if (response.status == 'OK') {
                    this.router.navigate(['/components/employees/employees-main'], { relativeTo: this.route })
                }
            }
            )
    }

    ngAfterViewInit() {
        this._script.load('app-edit-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');
    }


}

