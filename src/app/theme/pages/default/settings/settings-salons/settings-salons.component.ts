import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SalonService } from "../../../../../salon/salon.service";
import { ChainService } from "../../../../../chain/chain.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Salon } from "../../../../../salon/salon.model";
import {CreateSalonComponent} from "./create-salon/create-salon.component";
import {EditSalonComponent} from "./edit-salon/edit-salon.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalService} from "../../../../../shared/modal.service";

@Component({
    selector: 'app-settings-salons',
    templateUrl: './settings-salons.component.html',
    styleUrls: ['./settings-salons.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SettingsSalonsComponent implements OnInit {
    salons: Salon[];

    constructor(private router: Router,
        private route: ActivatedRoute,
        private chainService: ChainService,
        private salonService: SalonService,
        private modalService: ModalService) {
    }

    ngOnInit() {
        this.salonService
            .getSalonsGeneralData()
            .subscribe(
            (res: any) => this.renderSalons(res)
            );
    }

    renderSalons(salons: any): void {
        this.salons = salons;
    }

    openModalForm(form: any): void {
        const modalRef = this.modalService.open(form, { size: 'lg' });
    }

    openCreateSalonForm(): void {
        this.salonService.setEditedSalon(new Salon());
        this.openModalForm(CreateSalonComponent);
    }

    openEditSalonForm(salon: Salon): void {
        this.salonService.getSalonById(salon.id)
            .subscribe(
                next => {
                    this.salonService.setEditedSalon(next);

                },
                    err => console.log(err)
            );

        this.openModalForm(EditSalonComponent);

    }
}
