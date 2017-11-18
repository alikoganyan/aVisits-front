import {
    Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Salon } from "../../../../../../salon/salon.model";
import { MapsAPILoader } from "@agm/core";
import { FormControl } from "@angular/forms";
import { } from 'googlemaps';
import { GeoNamesService } from "../../../../../../shared/_services/geo-names.service";
import "rxjs/add/operator/do";
import { Router } from "@angular/router";

@Component({
    selector: 'app-salon-edit-form',
    templateUrl: './salon-edit-form.component.html',
    styleUrls: ['./salon-edit-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SalonEditFormComponent implements OnInit {
    @Input() isCreateDialog: boolean;
    @Input() salon: Salon = new Salon();
    @Output() saveSalon = new EventEmitter<any>();
    @Output() deleteSalon = new EventEmitter<any>();

    title: string;
    popupVisible: boolean;
    submitButtonText: string;
    canDeleteSalon: boolean;

    public searchControl: FormControl;
    public zoom: number;

    countries: any[];
    cities: any[];
    addresses: any[];

    addressAutoComplete: google.maps.places.Autocomplete;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(
        private router: Router,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private geoNamesService: GeoNamesService
    ) {
    }

    ngOnInit() {
        this.title = this.isCreateDialog ? 'Новый салон' : 'Обновить салон';
        this.submitButtonText = this.isCreateDialog ? 'Сохранить' : 'Обновить';
        this.canDeleteSalon = !this.isCreateDialog;

        this.loadCountries();

        this.searchControl = new FormControl();

        // this.initAddressAutoComplete();
    }

    // initAddressAutoComplete(): void {
    //     this.mapsAPILoader.load().then(() => {
    //         console.log("maps api load", this.searchElementRef.nativeElement)
    //         this.addressAutoComplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //             types: ["address"]
    //         });
    //         this.addressAutoComplete.addListener("place_changed", () => {
    //             /*this.ngZone.run(() => */this.onAddressPlaceChanged()/*);*/
    //         });
    //     });
    // }

    onAddressPlaceChanged() {
        let place: google.maps.places.PlaceResult = this.addressAutoComplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
            return;
        }
        this.searchControl.setValue(place.name);
        //set latitude, longitude and zoom
        this.salon.latitude = place.geometry.location.lat();
        this.salon.longitude = place.geometry.location.lng();
        this.zoom = 17;
    }

    onMarkerDragEnd(): void {
        //TODO: update address
    }

    loadCountries(): void {
        this.geoNamesService
            .getCountries()
            .subscribe(
                next => this.countries = next.response.items
            )
    }

    loadCities($event): void {
        this.geoNamesService
            .getCities(this.getSelectedCountryId(), this.salon.city)
            .subscribe(
                next => {
                    if(next.response) {
                        this.cities = next.response.items
                    }
                },
                error => {}
            )
    }

    loadAddresses(): void {
        this.geoNamesService
            .getStreet(this.salon.country, this.salon.city, this.salon.address)
            .do(console.log)
            .subscribe(
                next => {
                    this.addresses = next.results.map(r => this.formatAddress(r))
                    // this.addresses = next.results.map(r => {
                    //     return {title: r.address_components[0]['long_name']}
                    // })
                    console.log(this.addresses)
                })
    }

    formatAddress(place): any {
        let route = '',
            streetNumber = '';
        let routePart = place.address_components.filter(c => c.types[0] === 'route');
        if(routePart && routePart[0]) {
            route = routePart[0]['long_name']
        }

        let streetNumberPart = place.address_components.filter(c => c.types[0] === 'street_number');
        if(streetNumberPart && streetNumberPart[0]) {
            streetNumber = ' ' + streetNumberPart[0]['long_name'];
        }

        return { title: route + streetNumber };
    }

    addressValueChanged($event): void {
        this.loadAddresses();
    }

    cityValueChanged($event) {
        this.loadCities($event);
        if(!this.salon.country) {
            this.salon.country = "Россия";
        }
    }

    getSelectedCountryId(): any {
        return ((this.countries || []).filter(c => c.title === this.salon.country)[0] || {}).id || 0;
    }

    onSubmit() {
        this.saveSalon.emit(this.salon);
    }

    onDelete() {
        this.deleteSalon.emit(this.salon);
    }

}
