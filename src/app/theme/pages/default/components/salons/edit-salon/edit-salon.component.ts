import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    ElementRef,
    OnInit,
    ViewChild,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";
import {CreateSalonService} from "../../../../../_services/create-salon.service";
import {AlertService} from "../../../../../../auth/_services/alert.service";
import {AlertComponent} from "../../../../../../auth/_directives/alert.component";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-edit-salon',
    templateUrl: './edit-salon.component.html',
    styleUrls: ['./edit-salon.component.css']
})

export class EditSalonComponent implements OnInit, AfterViewInit {
    salon: any;
    salonId = 0;
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
        id: null,
        title: '',
        country: '',
        city: '',
        address: '',
        street_number: '',
        latitude: '',
        longitude: '',
        schedule: []
    };

    paramsSubscription: Subscription;

    @ViewChild('latitude') private latitude: ElementRef;
    @ViewChild('longitude') private longitude: ElementRef;
    @ViewChild('street_number') private street_number: ElementRef;
    @ViewChild('street') private street: ElementRef;
    @ViewChild('city') private city: ElementRef;
    @ViewChild('country') private country: ElementRef;
    @ViewChild('titleNewSalon') private titleNewSalon: ElementRef;
    @ViewChild('addressEditSalon') private addressEditSalon: ElementRef;


    @ViewChildren('start') startInputs;
    @ViewChildren('end') endInputs;
    @ViewChildren('onchangeStatusWeekday') onchangeStatusWeekday;
    @ViewChild('editSalonTimePicker', {read: ViewContainerRef}) alertTimePicker: ViewContainerRef;


    constructor(private router: Router,
                private route: ActivatedRoute,
                private _script: ScriptLoaderService,
                private createSalonService: CreateSalonService,
                private cfr: ComponentFactoryResolver,
                private _alertService: AlertService) {
    }

    onchangeStatusWorkday() {
        for (let i in this.startInputs._results) {
            this.startInputs._results[i].nativeElement.disabled = this.onchangeStatusWeekday._results[i].nativeElement.checked;
            this.endInputs._results[i].nativeElement.disabled = this.onchangeStatusWeekday._results[i].nativeElement.checked;
        }
    }

    ngOnInit() {
        this.paramsSubscription = this.route.params
            .subscribe(
                (params: Params) => {
                    this.salonId = +params['id']
                }
            );
        this.getEachSalonForEdit();

    }

    backToAllSalons() {
        this.router.navigate(['/components/salons/all-salons'], {relativeTo: this.route})
    }

    onSubmit() {
        let error = false;
        this.timePickers.schedule = [];
        let workingDays = [1, 1, 1, 1, 1, 1, 1];
        for (let i in this.startInputs._results) {
            // console.log(this.salon.schedule[i].id)
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
                id: this.salon.schedule[i].id,
                num_of_day: parseInt(i) + 1,
                salon_id: this.salonId,
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
            console.log('Название салона и адрес обязательные поля!');
            this.showAlert('alertTimePicker');
            this._alertService.error('Название салона и адрес обязательные поля!');
        }
        else if (error) {
            console.log('Время некорректно задано!');
            this.showAlert('alertTimePicker');
            this._alertService.error('Время некорректно задано!');
        }
        else {
            this.timePickers.title = this.titleNewSalon.nativeElement.value;
            this.timePickers.country = this.country.nativeElement.value;
            this.timePickers.city = this.city.nativeElement.value;
            this.timePickers.address = this.street.nativeElement.value;
            this.timePickers.street_number = this.street_number.nativeElement.value;
            this.timePickers.latitude = this.latitude.nativeElement.value;
            this.timePickers.longitude = this.longitude.nativeElement.value;
            this.timePickers.id = this.salonId;
            // console.log(this.timePickers);
            this.createSalonService.editSalon(this.timePickers).subscribe((response) => {
                console.log(response)
                // if (response.success == "Created successfully") {
                this.router.navigate(['/components/salons/all-salons'], {relativeTo: this.route})
                // }
            })
        }
    }

    onDeleteSalon() {
        this.createSalonService.deleteSalon(this.salonId)
            .subscribe(
                (response) => {
                    if (response.success == 1) {
                        this.router.navigate(['/components/salons/all-salons'], {relativeTo: this.route})
                    }
                }
            )
    }

    getEachSalonForEdit() {
        this.createSalonService.getEachSalonForEdit(this.salonId)
            .subscribe(
                (response) => {
                    this.salon = response.data;
                    this.titleNewSalon.nativeElement.value = response.data.title;
                    this.country.nativeElement.value = response.data.country;
                    this.city.nativeElement.value = response.data.city;
                    this.street.nativeElement.value = response.data.address;
                    this.street_number.nativeElement.value = response.data.street_number;
                    this.latitude.nativeElement.value = response.data.latitude;
                    this.longitude.nativeElement.value = response.data.longitude;

                    if (response.data.street_number == null) {
                        response.data.street_number = '';
                    }
                    if (response.data.address == null) {
                        response.data.address = '';
                    }
                    if (response.data.city == null) {
                        response.data.city = '';
                    }

                    this.addressEditSalon.nativeElement.value = response.data.street_number + ' ' + response.data.address + ' ' + response.data.city + ' ' + response.data.country;
                    let workingDays = [false, false, false, false, false, false, false];

                    for (let i in this.startInputs._results) {
                        let working_status = response.data.schedule[i].working_status;
                        if (working_status == 0) {
                            workingDays[i] = true;
                            this.onchangeStatusWeekday._results[i].nativeElement.checked = true;
                        }
                        else if (working_status == 1) {
                            workingDays[i] = false;
                        }
                        this.startInputs._results[i].nativeElement.disabled = workingDays[i];
                        this.endInputs._results[i].nativeElement.disabled = workingDays[i];
                    }
                }
            )
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
