import {
    Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren,
    ComponentFactoryResolver, ViewContainerRef
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";
import {AlertComponent} from "../../../../../../auth/_directives/alert.component";
import {AlertService} from "../../../../../../auth/_services/alert.service";
import {CreateSalonService} from "../../../../../_services/create-salon.service";

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
    @ViewChild('timePicker', {read: ViewContainerRef}) timePicker: ViewContainerRef;


    constructor(private _script: ScriptLoaderService,
                private cfr: ComponentFactoryResolver,
                private _alertService: AlertService,
                private createSalonService: CreateSalonService,
                private router: Router,
                private route: ActivatedRoute,) {
    }

    onChange(showWeekday: { show: boolean, weekDay: string }) {
        showWeekday.show = !showWeekday.show;
        this._script.load('app-create-salon',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-timepicker.js');
    }


    onClick() {
        let error = false;
        console.log(this.startInputs._results[2].nativeElement.value);
        this.timePickers.schedule = [];
        console.log(this.startInputs._results);
        for (let i in this.startInputs._results) {
            this.timePickers.schedule.push({
                num_of_day: i,
                start: this.startInputs._results[i].nativeElement.value,
                end: this.endInputs._results[i].nativeElement.value,
                working_status: 1
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
            // this.showAlert('timePicker');
           this.timePickers.title = this.titleNewSalon.nativeElement.value,
           this.timePickers.country = this.country.nativeElement.value,
           this.timePickers.city = this.city.nativeElement.value,
           this.timePickers.address = this.street.nativeElement.value,
           this.timePickers.latitude = this.latitude.nativeElement.value,
           this.timePickers.longitude = this.longitude.nativeElement.value
            console.log(this.timePickers);
            this.createSalonService.createNewSalon(this.timePickers)
                .subscribe(
                    (response) => {
                        if (response.success == "Created successfully") {
                            this.router.navigate(['/components/salons/all-salons'], {relativeTo: this.route})
                        }
                    }
                )
        }

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this._script.load(
            'app-create-salon',
            'assets/vendors/custom/gmaps/gmaps.js',
            'assets/demo/default/custom/components/maps/create-new-salon-google-map.js',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-timepicker.js');
    }


    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

}

