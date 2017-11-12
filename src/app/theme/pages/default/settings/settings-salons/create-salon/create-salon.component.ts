import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Salon} from "../../../../../../salon/salon.model";
import {Router} from "@angular/router";
import {SalonService} from "../../../../../../salon/salon.service";

@Component({
    selector: 'app-create-salon',
    templateUrl: './create-salon.component.html',
    styleUrls: ['./create-salon.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateSalonComponent implements OnInit {
    salon: Salon;
    saveSuccessful: boolean;

    constructor(private salonService: SalonService) {
        this.salon = new Salon();
    }

    ngOnInit() {

    }

    onSaveSalon(salon: Salon) {
        this.salonService
            .createSalon(salon)
            .subscribe(
                data => this.saveSuccessful = true
            )
    }

}
