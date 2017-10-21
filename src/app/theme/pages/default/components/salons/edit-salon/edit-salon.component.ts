import {
    AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewChildren,
    ViewContainerRef
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";
import {CreateSalonService} from "../../../../../_services/create-salon.service";
import {AlertService} from "../../../../../../auth/_services/alert.service";
import {AlertComponent} from "../../../../../../auth/_directives/alert.component";

@Component({
    selector: 'app-edit-salon',
    templateUrl: './edit-salon.component.html',
    styleUrls: ['./edit-salon.component.css']
})

export class EditSalonComponent implements OnInit, AfterViewInit {
    salon: any;
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
    @ViewChild('timePicker', {read: ViewContainerRef}) alertTimePicker: ViewContainerRef;


    constructor(private router: Router,
                private route: ActivatedRoute,
                private _script: ScriptLoaderService,
                private createSalonService: CreateSalonService,
                private cfr: ComponentFactoryResolver,
                private _alertService: AlertService) {
    }

    onChange(showWeekday: { show: boolean, weekDay: string }) {
        showWeekday.show = !showWeekday.show;
        this._script.load('app-edit-salon',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-timepicker.js');
    }

    onchangeStatusWorkday(event) {
        // console.log(event.target.checked);
        for (let i in this.showWeekdays) {
            this.startInputs._results[i].nativeElement.disabled = event.target.checked;
            // this.endInputs._results[i].nativeElement.disabled = event.target.checked;
        }
    }

    ngOnInit() {
    }

    backToAllSalons() {
        this.router.navigate(['/components/salons/all-salons'], {relativeTo: this.route})
    }


    onSubmit() {
        let error = false;

        this.timePickers.schedule = [];
        let workingDays = [1, 1, 1, 1, 1, 1, 1];
        for (let i in this.startInputs._results) {
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


            if (this.timePickers.schedule[i].start > this.timePickers.schedule[i].end) {
                console.log("BREAK");
                error = true;
                break;
            }
            else {
                error = false;
            }
        }
        if (error) {
            this.showAlert('timePicker');
            this._alertService.error('Время некорректно задано!');
        } else {
            // this.showAlert('alertTimePicker');
            this.timePickers.title = this.titleNewSalon.nativeElement.value,
                this.timePickers.country = this.country.nativeElement.value,
                this.timePickers.city = this.city.nativeElement.value,
                this.timePickers.address = this.street.nativeElement.value,
                this.timePickers.latitude = this.latitude.nativeElement.value,
                this.timePickers.longitude = this.longitude.nativeElement.value
            console.log(this.timePickers);
            /*this.createSalonService.createNewSalon(this.timePickers).subscribe((response) => {
                        if (response.success == "Created successfully") {
                            this.router.navigate(['/components/salons/all-salons'], {relativeTo: this.route})
                        }
                    })*/
        }
    }

    ngAfterViewInit() {
        this._script.load(
            'app-edit-salon',
            'assets/vendors/custom/gmaps/gmaps.js',
            'assets/demo/default/custom/components/maps/edit-salon-google-map.js');
    }

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

}
