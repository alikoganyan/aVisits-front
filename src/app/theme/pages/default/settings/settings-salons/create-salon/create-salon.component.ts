import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Salon } from "../../../../../../salon/salon.model";
import { Router } from "@angular/router";
import { SalonService } from "../../../../../../salon/salon.service";
import { UserService } from "../../../../../../auth/_services/user.service";
import { AuthenticationService } from "../../../../../../auth/_services/authentication.service";

@Component({
    selector: 'app-create-salon',
    templateUrl: './create-salon.component.html',
    styleUrls: ['./create-salon.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateSalonComponent implements OnInit {
    salon: Salon;
    saveSuccessful: boolean;
    currentChainId: any;

    constructor(
        private salonService: SalonService,
        private authService: AuthenticationService
    ) {

        this.currentChainId = this.authService.stepsData.selectedChain;
        this.salon = new Salon();
        this.salon.chain_id = this.currentChainId;
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
