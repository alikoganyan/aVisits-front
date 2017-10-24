import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeService } from "../../../../../_services/employee.service";

@Component({
    selector: 'app-employees-main',
    templateUrl: './employees-main.component.html',
    styleUrls: ['./employees-main.component.css']
})
export class EmployeesMainComponent implements OnInit {

    employees = [];

    constructor(private router: Router,
        private route: ActivatedRoute,
        private employeeService: EmployeeService) {
    }

    ngOnInit() {
        this.getEmployees();
    }

    redirectToCreateEmployee() {
        this.router.navigate(['/components/employees/employee'], { relativeTo: this.route })
    }

    goToEditEmployee(employee) {
        /* this.employeeService.getEmployee(employee.id)
             .subscribe(
                 (response) => {
                     console.log(response.data.status)
                     if (response.data.status == 'OK') {
                        this.router.navigate(['/components/employees/edit-employee/' + employee.id], {relativeTo: this.route})
                     }
                 }
             );*/
        this.router.navigate(['/components/employees/edit-employee/' + employee.id], { relativeTo: this.route })
    }

    getEmployees() {
        this.employeeService.getEmployees()
            .subscribe(
            (response) => {
                this.employees = response.data;
            }
            )
    }


}
