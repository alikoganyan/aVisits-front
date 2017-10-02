import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";
import {EmployeeService} from "../../../../../_services/employee.service";


declare let Dropzone: any;

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, AfterViewInit {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    action: string = "http://api.avisits.com/api/" + this.currentUser.chain.id + "/employee-photo-upload?token=" + this.currentUser.token;
    showFiredEmployee = false;
    radioButtonChackDays = 'byShifts';
    showWeekdays: any = [
        {
            show: false,
            weekDay: 'Пн',
            addWeekdayInterval: [
                {start: 'Начало', end: 'Конец'}
            ]
        },
        {
            show: false,
            weekDay: 'Вт',
            addWeekdayInterval: [
                {start: 'Начало', end: 'Конец'}
            ]
        },
        {
            show: false,
            weekDay: 'Ср',
            addWeekdayInterval: [
                {start: 'Начало', end: 'Конец'}
            ]
        },
        {
            show: false,
            weekDay: 'Чт',
            addWeekdayInterval: [
                {start: 'Начало', end: 'Конец'}
            ]
        },
        {
            show: false,
            weekDay: 'Пт',
            addWeekdayInterval: [
                {start: 'Начало', end: 'Конец'}
            ]
        },
        {
            show: false,
            weekDay: 'Сб',
            addWeekdayInterval: [
                {start: 'Начало', end: 'Конец'}
            ]
        },
        {
            show: false,
            weekDay: 'Вс',
            addWeekdayInterval: [
                {start: 'Начало', end: 'Конец'}
            ]
        }
    ];
    addWorkIntervalByShifts: { start: string, end: string }[] = [];

    @ViewChild('startWorkTime') startWorkTime: ElementRef;
    @ViewChild('dismissedTime') dismissedTime: ElementRef;

    positions = [];

    constructor(private _script: ScriptLoaderService,
                private employeeService: EmployeeService) {
    }

    addWeekdayInterval(showWeekday) {
        showWeekday.addWeekdayInterval.push({start: 'Начало', end: 'Конец'});
        this._script.load('app-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-select.js');
    }

    onAddWorkTime() {
        this.addWorkIntervalByShifts.push(
            {start: 'Начало', end: 'Конец'}
        );
        this._script.load('app-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-select.js');
    }

    onRemoveWorkTime(id: number) {
        this.addWorkIntervalByShifts.splice(id, 1);
    }

    onRemoveWorkTimes(showWeekday, id: number) {
        showWeekday.addWeekdayInterval.splice(id, 1);
    }

    onChange(showWeekday) {
        showWeekday.show = !showWeekday.show;
        console.log();
        this._script.load('app-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-select.js');
    }

    ngOnInit() {
        this.getPositions();
        console.log(this.action);
    }

    getPositions() {
        this.employeeService.getPositions()
            .subscribe(
                (response) => {
                    this.positions = response.data;
                }
            )
    }

    onShowFiredEmployee(event) {
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

    onSubmit(form: NgForm) {
        console.log(form.value);
        console.log(this.startWorkTime.nativeElement.defaultValue);
        console.log(this.dismissedTime.nativeElement.defaultValue);
    }




}
