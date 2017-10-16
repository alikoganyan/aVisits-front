import {
    Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren,
    ComponentFactoryResolver, ViewContainerRef
} from '@angular/core';
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";
import {AlertComponent} from "../../../../../../auth/_directives/alert.component";
import {AlertService} from "../../../../../../auth/_services/alert.service";
import {CreateSalonService} from "../../../../../_services/create-salon.service";

declare let Dropzone: any;

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
    timePickers: any = [];

    @ViewChild('latitude') private latitude : ElementRef;
    @ViewChild('longitude') private longitude : ElementRef;
    @ViewChild('street_number') private street_number : ElementRef;
    @ViewChild('street') private street : ElementRef;
    @ViewChild('city') private city : ElementRef;
    @ViewChild('country') private country : ElementRef;


    @ViewChildren('start') startInputs;
    @ViewChildren('end') endInputs;
    @ViewChild('timePicker', { read: ViewContainerRef }) timePicker: ViewContainerRef;



    constructor(private _script: ScriptLoaderService,
                private cfr: ComponentFactoryResolver,
                private _alertService: AlertService,
                private createSalonService: CreateSalonService) {
    }

    onChange(showWeekday: { show: boolean, weekDay: string }) {
        showWeekday.show = !showWeekday.show;
        this._script.load('app-create-salon',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-timepicker.js');
    }


    onClick(event) {
        let error = false;
        this.timePickers = [];
        for (let i in this.startInputs._results) {
            this.timePickers.push({
                id: i,
                start: this.startInputs._results[i].nativeElement.value,
                end: this.endInputs._results[i].nativeElement.value
            });
            if (this.timePickers[i].start > this.timePickers[i].end) {
                error = true;
                break;
            }
            else {
                error = false;
            }
        }
        if(error){
            this.showAlert('timePicker');
            this._alertService.error('Время некорректно задано!');
        } else {
            this.showAlert('timePicker');
            this._alertService.success('Салон успешно создан!');

            this.createSalonService.createNewSalon();
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this._script.load('app-create-salon',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-select.js',
            'assets/vendors/custom/gmaps/gmaps.js',
            'assets/demo/default/custom/components/maps/create-new-salon-google-map.js',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-timepicker.js');
        Dropzone._autoDiscoverFunction();
    }


    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

}

