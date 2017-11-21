import {Component, Injector, OnInit, ViewEncapsulation} from '@angular/core';
import { Salon } from "../../../../../../salon/salon.model";
import { SalonService } from "../../../../../../salon/salon.service";
import { ActivatedRoute, Router } from "@angular/router";
import "rxjs/add/operator/do";

@Component({
    selector: 'app-edit-salon',
    templateUrl: './edit-salon.component.html',
    styleUrls: ['./edit-salon.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EditSalonComponent implements OnInit {
    id: string;
    salon: Salon = new Salon();
    saveSuccessful: boolean;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private salonService: SalonService,
                private injector: Injector) {
        this.salon = this.injector.get('salon');
    }

    ngOnInit() {
    }

    onSaveSalon(salon: Salon) {
        this.salonService
            .updateSalon(salon);
    }

    onDeleteSalon(salon: Salon) {
        this.salonService
            .delete(salon);
    }

}
