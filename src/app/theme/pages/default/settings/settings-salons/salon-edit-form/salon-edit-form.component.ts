import {
    Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Salon } from "../../../../../../salon/salon.model";
import {AgmMap, GoogleMapsAPIWrapper, MapsAPILoader} from "@agm/core";
import { FormControl } from "@angular/forms";
import { } from 'googlemaps';
import { GeoNamesService } from "../../../../../../shared/_services/geo-names.service";
import "rxjs/add/operator/do";
import { Router } from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import "rxjs/add/operator/take";
import "rxjs/add/operator/mergeAll";
import {SalonService} from "../../../../../../salon/salon.service";
import {EditFormBase} from "../../edit-form-base";
import * as fromChain from '../../../reducers/chain';
import * as fromRoot from '../../../reducers';
import {Store} from "@ngrx/store";

@Component({
    selector: 'app-salon-edit-form',
    templateUrl: './salon-edit-form.component.html',
    styleUrls: ['./salon-edit-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SalonEditFormComponent extends EditFormBase<Salon> {

    protected get createTitle() { return 'Добавление салона'; }
    protected get editTitle() { return 'Обновить салон'; }

    @ViewChild('map') map: AgmMap;

    chainsDataSource$ = this.store.select(fromChain.selectAllChains);
    chainsDataSource: any;
    notificationTypes: any[];
    notificationTypesValue: any[];

    popupVisible: boolean;
    submitButtonText: string;
    canDeleteSalon: boolean;

    public zoom: number;

    countries: any[];
    countryNames: any[];
    cities: any[];

    imageSrc: string;

    constructor(
        public activeModal: NgbActiveModal,
        private geoNamesService: GeoNamesService,
        private salonService: SalonService,
        private store: Store<fromRoot.State>
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();

        this.imageSrc = 'assets/app/media/img/products/product1.jpg';

        this.chainsDataSource$.subscribe(
            next => this.chainsDataSource = next
        );
        this.notificationTypes = this.salonService.notificationTypes;
        this.notificationTypesValue = this.data.notify_about_appointments;//.split(',');

        this.canDeleteSalon = !this.isCreateForm;
        this.zoom = this.isCreateForm ? 10 : 17;

        this.loadCountries();

        this.popupVisible = true;

        this.resizeMap();
    }

    resizeMap() {
        // https://github.com/SebastianM/angular-google-maps/issues/995
        this.map.triggerResize();
    }

    onAddressPlaceChanged(place: any) {
        if (!place.geometry) {
            return;
        }
        this.data.latitude = place.geometry.location.lat;
        this.data.longitude = place.geometry.location.lng;
        this.zoom = 17;
    }

    onMarkerDragEnd(coords): void {
        this.geoNamesService
            .latLngToAddress(coords.lat, coords.lng)
            .subscribe((addressComponents) => {
                addressComponents.forEach(addressComponent => {
                    switch(addressComponent.type) {
                        case 'country':
                            this.data.country = addressComponent.title;
                            break;
                        case 'locality':
                            this.data.city = addressComponent.title;
                            break;
                        case 'street_address':
                        case 'premise':
                            this.data.address = addressComponent.title;
                            break;
                    }
                });

                this.data.latitude = coords.lat;
                this.data.longitude = coords.lng;
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
            .getStreet(this.data.country, this.data.city, this.data.address)
            .subscribe(
                next => {
                    let place = next.results[0];
                    this.onAddressPlaceChanged(place);
                });
    }

    cityValueChanged($event) {
        this.data.city = $event.value;
    }

    getSelectedCountryId(): any {
        return ((this.countries || []).filter(c => c.title === this.data.country)[0] || {}).id || 0;
    }

    notificationChanged($event): void {
        let maxCount = 2;
        let newValue = $event.value;
        if($event.value.length > maxCount) {
            newValue = $event.value.slice(0, maxCount);
        }

        this.data.notify_about_appointments = newValue;
    }

    onFileChange($event) {
        let file:File = $event.value[0];
        let fileReader = new FileReader();

        fileReader.onload = (fileLoaded) => {
            let image = (<any>fileLoaded.target).result;
            this.data.photo = image;
            this.imageSrc = image; //show preview
        };

        fileReader.readAsDataURL(file);
    }

    onClose() {
        // TODO: check for changes in form
        this.activeModal.close();
    }

}
