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
import * as salonActions from '../../../../../../salon/actions/collection';
import {Store} from "@ngrx/store";
import {ImageSrcPipe} from "../../../../../../shared/pipes/image-src.pipe";
import * as fromAuth from "../../../../../../auth/reducers";

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
    notificationTypes: any[];
    notificationTypesValue: any[];

    popupVisible: boolean;
    submitButtonText: string;
    canDeleteSalon: boolean;

    public zoom: number;

    countries: any[];
    countryNames: any[];
    cities: any[];

    token$ = this.store.select(fromAuth.getToken);

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

        this.notificationTypes = this.salonService.notificationTypes;
        this.notificationTypesValue = this.data.notify_about_appointments;

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
        let newValue = $event.value;

        this.data.notify_about_appointments = newValue;
    }

    onImageUploaded(e) {
        let responseData = JSON.parse(e.request.response);

        this.data.img = responseData.data.img;
    }

    onClose() {
        // TODO: check for changes in form
        this.activeModal.close();
        this.store.dispatch(salonActions.collectionActions.FinishOperation());
    }

}
