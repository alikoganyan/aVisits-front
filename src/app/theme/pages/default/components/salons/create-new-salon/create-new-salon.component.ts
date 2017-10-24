import {
    Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren,
    ComponentFactoryResolver, ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ScriptLoaderService } from "../../../../../../_services/script-loader.service";
import { AlertComponent } from "../../../../../../auth/_directives/alert.component";
import { AlertService } from "../../../../../../auth/_services/alert.service";
import { CreateSalonService } from "../../../../../_services/create-salon.service";

@Component({
    selector: 'app-create-salon',
    templateUrl: './create-new-salon.component.html',
    styleUrls: ['./create-new-salon.component.css']
})
export class CreateNewSalonComponent implements OnInit, AfterViewInit {

    showWeekdays: any = [
        {
            show: false,
            weekDay: 'Пн',
        },
        {
            show: false,
            weekDay: 'Вт',
        },
        {
            show: false,
            weekDay: 'Ср',
        },
        {
            show: false,
            weekDay: 'Чт',
        },
        {
            show: false,
            weekDay: 'Пт',
        },
        {
            show: false,
            weekDay: 'Сб',
        },
        {
            show: false,
            weekDay: 'Вс',
        }
    ];
    timePickers: any = {
        title: '',
        country: '',
        city: '',
        street: '',
        street_number: '',
        latitude: '',
        longitude: '',
        schedule: []
    };



    @ViewChild('latitude') private latitude: ElementRef;
    @ViewChild('longitude') private longitude: ElementRef;
    @ViewChild('street_number') private street_number: ElementRef;
    @ViewChild('street') private street: ElementRef;
    @ViewChild('city') private city: ElementRef;
    @ViewChild('country') private country: ElementRef;
    @ViewChild('titleNewSalon') private titleNewSalon: ElementRef;


    @ViewChildren('start') startInputs;
    @ViewChildren('end') endInputs;
    @ViewChildren('onchangeStatusWeekday') onchangeStatusWeekday;
    @ViewChild('timePicker', { read: ViewContainerRef }) timePicker: ViewContainerRef;


    constructor(private _script: ScriptLoaderService,
        private cfr: ComponentFactoryResolver,
        private _alertService: AlertService,
        private createSalonService: CreateSalonService,
        private router: Router,
        private route: ActivatedRoute, ) {
    }

    onChange(showWeekday: { show: boolean, weekDay: string }) {
        showWeekday.show = !showWeekday.show;
        this._script.load('app-create-salon',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-timepicker-salon.js');
    }

    onchangeStatusWorkday() {
        for (let i in this.startInputs._results) {
            this.startInputs._results[i].nativeElement.disabled = this.onchangeStatusWeekday._results[i].nativeElement.checked;
            this.endInputs._results[i].nativeElement.disabled = this.onchangeStatusWeekday._results[i].nativeElement.checked;
        }
    }

    goToAllSalons() {
        this.router.navigate(['/components/salons/all-salons'], { relativeTo: this.route })
    }

    onSubmit() {
        let error = false;
        let workDayCount = 0;
        this.timePickers.schedule = [];
        let workingDays = [1, 1, 1, 1, 1, 1, 1];
        for (let i in this.startInputs._results) {
            workDayCount++;
            // console.log(this.startInputs._results[i].nativeElement.disabled);
            // console.log(this.startInputs._results[i].nativeElement.value);
            // console.log(this.onchangeStatusWeekday._results[i].nativeElement.checked);
            let working_status = this.onchangeStatusWeekday._results[i].nativeElement.checked;
            if (working_status == false) {
                workingDays[i] = 1;
            }
            else if (working_status == true) {
                workingDays[i] = 0;
            }
            // console.log(workingDays[i]);
            this.timePickers.schedule.push({
                num_of_day: i,
                start: this.startInputs._results[i].nativeElement.value,
                end: this.endInputs._results[i].nativeElement.value,
                working_status: workingDays[i]
            });
            if (Date.parse('01/01/2011 ' + this.timePickers.schedule[i].start) > Date.parse('01/01/2011 ' + this.timePickers.schedule[i].end)) {
                // console.log("BREAK");
                error = true;
                break;
            }
            else {
                error = false;
            }
        }
        if (this.titleNewSalon.nativeElement.value == '' || this.country.nativeElement.value == '' || this.city.nativeElement.value == '') {
            this.showAlert('timePicker');
            this._alertService.error('Название салона и адрес обязательные поля!');
        }
        else if (error) {
            this.showAlert('timePicker');
            this._alertService.error('Время некорректно задано!');
        }
        else if (workDayCount < 7) {
            this.showAlert('timePicker');
            this._alertService.error('Выберите все дневные интервалы!');
        }
        else {
            this.timePickers.title = this.titleNewSalon.nativeElement.value,
                this.timePickers.country = this.country.nativeElement.value,
                this.timePickers.city = this.city.nativeElement.value,
                this.timePickers.address = this.street.nativeElement.value,
                this.timePickers.street_number = this.street_number.nativeElement.value,
                this.timePickers.latitude = this.latitude.nativeElement.value,
                this.timePickers.longitude = this.longitude.nativeElement.value
            // console.log(this.timePickers);
            this.createSalonService.createNewSalon(this.timePickers)
                .subscribe(
                (response) => {
                    if (response.success == "Created successfully") {
                        this.router.navigate(['/components/salons/all-salons'], { relativeTo: this.route })
                    }
                })
        }

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this._script.load(
            'app-create-salon',
            'assets/vendors/custom/gmaps/gmaps.js',
            'assets/demo/default/custom/components/maps/create-new-salon-google-map.js',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-timepicker-salon.js');
    }


    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

}

