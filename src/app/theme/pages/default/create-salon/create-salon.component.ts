import {Component, OnInit, AfterViewInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {GetCityService} from "../../../../_services/get-city.service";


@Component({
    selector: 'app-create-salon',
    templateUrl: './create-salon.component.html',
    styleUrls: ['./create-salon.component.css']
})

export class CreateSalonComponent implements OnInit, AfterViewInit {
    countries = [];
    countryId: number;
    cities = [];
    selectedCountry: string;
    selectedCity: string = '';

    constructor(private getCityService: GetCityService) {
    }

    getCountries() {
        this.getCityService.getCountries()
            .subscribe(
                (countries) => {
                    this.countries = countries.response.items;
                }
            )
    }

    getCountryId(id: number, country: string) {
        this.selectedCity = '';
        this.selectedCountry = country;
        this.countryId = id;
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
        console.log(form.value.salonName);
        console.log(this.selectedCity);
        console.log(form.value.addressName);
        this.getCityService.getStreet(this.selectedCity, form.value.addressName)
            .subscribe(
                (street) => {
                    console.log(street);
                }
            )
    }

    ngOnInit() {
        this.getCountries();
    }

    ngAfterViewInit() {
    }

}
