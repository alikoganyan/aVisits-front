import {
    Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Salon } from "../../../../../../salon/salon.model";
import {GoogleMapsAPIWrapper, MapsAPILoader} from "@agm/core";
import { FormControl } from "@angular/forms";
import { } from 'googlemaps';
import { GeoNamesService } from "../../../../../../shared/_services/geo-names.service";
import "rxjs/add/operator/do";
import { Router } from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import "rxjs/add/operator/take";
import "rxjs/add/operator/mergeAll";
import {SalonService} from "../../../../../../salon/salon.service";

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

    public zoom: number = 10;

    countries: any[];
    countryNames: any[];
    cities: any[];

    constructor(
        public activeModal: NgbActiveModal,
        private router: Router,
        private mapsAPILoader: MapsAPILoader,
        private mapsApiWrapper: GoogleMapsAPIWrapper,
        private ngZone: NgZone,
        private geoNamesService: GeoNamesService,
        private salonService: SalonService
    ) {
        this.salonService.salonSaved.subscribe(
            next => this.activeModal.close()
        );
        this.salonService.salonDeleted.subscribe(
            next => this.activeModal.close()
        );
        this.salonService.salonFailed.subscribe(
            next => console.log(next)
        );
    }

    ngOnInit() {
        this.title = this.isCreateDialog ? 'Добавление салона' : 'Обновить салон';
        this.submitButtonText = this.isCreateDialog ? 'Сохранить' : 'Обновить';
        this.canDeleteSalon = !this.isCreateDialog;

        this.loadCountries();

        this.popupVisible = true;
    }

    onAddressPlaceChanged(place: any) {
        if (!place.geometry) {
            return;
        }
        this.salon.latitude = place.geometry.location.lat;
        this.salon.longitude = place.geometry.location.lng;
        this.zoom = 17;
    }

    onMarkerDragEnd(coords): void {
        this.geoNamesService
            .latLngToAddress(coords.lat, coords.lng)
            .subscribe((addressComponents) => {
                addressComponents.forEach(addressComponent => {
                    switch(addressComponent.type) {
                        case 'country':
                            this.salon.country = addressComponent.title;
                            break;
                        case 'locality':
                            this.salon.city = addressComponent.title;
                            break;
                        case 'street_address':
                        case 'premise':
                            this.salon.address = addressComponent.title;
                            break;
                    }
                })
            });
    }

    loadCountries(): void {
        this.geoNamesService
            .getCountries()
            .map(next => next.response.items)
            .subscribe(
                next => {
                    this.countries = next;
                    this.countryNames = next.map(i => i.title);
                }
            )
    }

    loadCities(text): void {
        this.geoNamesService
            .getCities(this.getSelectedCountryId(), text || '')
            .map(next => next.response.items.map(i => i.title))
            .subscribe(
                next => this.cities = next,
                error => {}
            )
    }

    searchAddress(): void {
        this.geoNamesService
            .getStreet(this.salon.country, this.salon.city, this.salon.address)
            .subscribe(
                next => {
                    let place = next.results[0];
                    this.onAddressPlaceChanged(place);
                });
    }

    cityValueChanged($event) {
        this.salon.city = $event.value;
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

    onClose() {
        // TODO: check for changes in form
        this.activeModal.close();
    }

}
