import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Salon } from "../../../../../../salon/salon.model";
import { Router } from "@angular/router";
import { SalonService } from "../../../../../../salon/salon.service";
import { UserService } from "../../../../../../auth/_services/user.service";
import { AuthenticationService } from "../../../../../../auth/_services/authentication.service";
import {User} from "../../../../../../auth/_models/user";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-create-salon',
    templateUrl: './create-salon.component.html',
    styleUrls: ['./create-salon.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateSalonComponent implements OnInit {
    salon: Salon;
    user: User;
    saveSuccessful: boolean;
    currentChainId: any;

    constructor(
        public activeModal: NgbActiveModal,
        private salonService: SalonService,
        private authService: AuthenticationService,
        private userService: UserService
    ) {
        this.userService.currentUser.subscribe(
            nextUser => this.user = nextUser
        );

        this.currentChainId = this.user.selectedChain;
        this.salon = new Salon();
        this.salon.chain_id = this.currentChainId;
    }

    ngOnInit() {

    }

    onSaveSalon(salon: Salon) {
        this.salonService
            .createSalon(salon);
    }

}
