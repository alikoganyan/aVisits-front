import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";
import { Message } from "primeng/primeng";

declare let Dropzone: any;
@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, AfterViewInit {
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
    addWorkIntervalByShifts: {start: string, end: string}[] = [];




    constructor(private _script: ScriptLoaderService) {
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

    onChange(showWeekday) {
        showWeekday.show = !showWeekday.show;
        console.log();
        this._script.load('app-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-select.js');
    }

    ngOnInit() {
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

    onSubmit() {

    }




}
