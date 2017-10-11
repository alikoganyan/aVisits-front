import {
    AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild,
    ViewContainerRef
} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";
import {EmployeeService} from "../../../../../_services/employee.service";
import {CreateEmployeePositionService} from "../../../../../_services/create-employee-position.service";
import {AlertComponent} from "../../../../../../auth/_directives/alert.component";
import {AlertService} from "../../../../../../auth/_services/alert.service";


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
    @ViewChild('alertEmployee', {read: ViewContainerRef}) alertEnter: ViewContainerRef;

    positions = [];

    switchServices = [
        {},
        {},
        {}
    ];

    constructor(private _script: ScriptLoaderService,
                private employeeService: EmployeeService,
                private createEmployeePositionService: CreateEmployeePositionService,
                private cfr: ComponentFactoryResolver,
                private _alertService: AlertService) {
    }

    deleteServiceSwitch(id: number) {
        this.switchServices.splice(id, 1);
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
        this._script.load('app-employee',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-select.js');
    }

    ngOnInit() {
        this.getPositions();
    }

    getPositions() {
        this.createEmployeePositionService.getPositions()
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
        // console.log(form.value);
        // console.log(this.startWorkTime.nativeElement.defaultValue);
        // console.log(this.dismissedTime.nativeElement.defaultValue);
        this.employeeService.addEmployee(
            form.value.name,
            form.value.surname,
            form.value.fatherName,
            form.value.email,
            form.value.phone,
            form.value.position)
            .subscribe(
                (data) => {
                    console.log(data);
                    // form.reset();
                    /*console.log(data.ValidationError.email[0]);
                    if (data.ValidationError.email[0] == "The email has already been taken.") {
                        this.showAlert('alertEmployee');
                        this._alertService.error('Данный майл уже используется');
                    }*/

                    if (data.status == "OK") {
                        console.log(data.status);
                        form.reset();
                        this.showAlert('alertEmployee');
                        this._alertService.success('Вы успешно создали сотрудника.');
                    }

                }
            )
    }


    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

}
