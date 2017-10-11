import {
    Component, OnInit, AfterViewInit, ViewChild, ElementRef, ComponentFactoryResolver,
    ViewContainerRef
} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {GetCityService} from "../../_services/get-city.service";
import {CreateSalonService} from "../../theme/_services/create-salon.service";
import {ScriptLoaderService} from "../../_services/script-loader.service";
import {AlertService} from "../_services/alert.service";
import {AlertComponent} from "../_directives/alert.component";

@Component({
    selector: 'app-create-salon',
    templateUrl: './create-salon.component.html',
    styleUrls: ['./create-salon.component.css']
})
export class CreateSalonComponent implements OnInit, AfterViewInit {
    @ViewChild('textCity') textCity: ElementRef;
    @ViewChild('alertSalon', {read: ViewContainerRef}) alertSalon: ViewContainerRef;
    countries = [];
    countryId: number;
    selectedCountry: string = '';
    cities = [];
    selectedCity = '';
    show = false;


    constructor(private router: Router,
                private route: ActivatedRoute,
                private getCityService: GetCityService,
                private createSalonService: CreateSalonService,
                private _script: ScriptLoaderService,
                private _alertService: AlertService,
                private cfr: ComponentFactoryResolver) {
    }

    onBlur() {
        this.show = false;
    }

    onFocus() {
        this.show = true;
    }

    getCountries() {
        this.getCityService.getCountries()
            .subscribe(
                (countries) => {
                    this.countries = countries.response.items;
                }
            )
    }

    getCountry(id: number, event: Event) {
        this.selectedCity = '';
        this.countryId = id;
        let selectElementText = event.target['options']
            [event.target['options'].selectedIndex].text;
        this.selectedCountry = selectElementText;
    }

    getCities(text: string) {
        if (!text) {
            this.cities = [];
            return false;
        }
        this.getCityService.getCities(this.countryId, text)
            .subscribe(
                (cities) => {
                    this.cities = cities.response.items;
                }
            )
    }

    citySelected(selectedCity: {id: number, title: string, region: string}) {
        this.selectedCity = selectedCity.title;
        // console.log(selectedCity.title);
        // console.log(this.selectedCity);
        this.cities = [];
    }

    onSubmit(form: NgForm) {
        console.log(this.selectedCountry, this.textCity.nativeElement.value, form.value.addressName);
        this.getCityService.getStreet(this.selectedCountry, this.textCity.nativeElement.value, form.value.addressName)
            .subscribe(
                (street) => {
                    if (street.status == 'ZERO_RESULTS') {
                        this.showAlert('alertSalon');
                        this._alertService.error('Адрес не найден');
                    }
                    else if (street.status == 'OK') {
                        console.log(form.value.title, this.selectedCountry, this.textCity.nativeElement.value, form.value.addressName, street.results[0].geometry.location.lat, street.results[0].geometry.location.lng);
                        this.createSalonService.createSalon(
                            form.value.title,
                            this.selectedCountry,
                            this.textCity.nativeElement.value,
                            form.value.addressName,
                            street.results[0].geometry.location.lat,
                            street.results[0].geometry.location.lng,
                        ).subscribe(
                            (response) => {
                                console.log(response);
                                if (response.success == 'Created successfully') {

                                   /* let currentUser = JSON.parse(localStorage.getItem('currentUser'));
                                    currentUser.redirect_to_create_salon = 0;
                                    localStorage.setItem('currentUser', JSON.stringify(currentUser));*/

                                    let currentSalon =  localStorage.setItem('currentSalon', JSON.stringify(response.data));

                                    this.router.navigate(['/'], {relativeTo: this.route})
                                }
                            },
                            error => {
                                console.log(error);
                                this.showAlert('alertSalon');
                                this._alertService.error('Went wrong');
                            }
                        )
                    }
                },
                error => console.log(error)
            );
    }

    ngOnInit() {
        this.getCountries();
    }



    ngAfterViewInit() {
        /*this._script.load('app-create-new-salon',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');*/
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/demo/default/custom/components/forms/widgets/typeahead.js');
    }

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
}
