import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GetCityService} from "../../../../_services/get-city.service";
import {CreateSalonService} from "../../../_services/create-salon.service";


@Component({
    selector: 'app-create-salon',
    templateUrl: './create-salon.component.html',
    styleUrls: ['./create-salon.component.css']
})

export class CreateSalonComponent implements OnInit, AfterViewInit {
    @ViewChild('textCity') textCity: ElementRef;
    countries = [];
    countryId: number;
    selectedCountry: string = '';
    cities = [];
    selectedCity: string = '';
    false_address = '';

    constructor(private getCityService: GetCityService,
                private createSalonService: CreateSalonService,
                private router: Router,
                private route: ActivatedRoute) {
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

    citySelected(selectedCity: string) {
        this.selectedCity = selectedCity;
        this.cities = [];
    }


    onSubmit(form: NgForm) {

        this.getCityService.getStreet(this.selectedCountry, this.textCity.nativeElement.value, form.value.addressName)
            .subscribe(
                (street) => {
                    if (street.status == 'ZERO_RESULTS') {
                        this.false_address = 'Адрес не найден';
                        form.reset({
                        });
                    }
                    else if (street.status == 'OK') {
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
                                    this.router.navigate(['/'], {relativeTo: this.route})
                                }
                            },
                            error => console.log(error)
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
    }

}
