import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SalonService } from "../../../../../salon/salon.service";
import { ChainService } from "../../../../../chain/chain.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Salon } from "../../../../../salon/salon.model";
import {CreateSalonComponent} from "./create-salon/create-salon.component";
import {EditSalonComponent} from "./edit-salon/edit-salon.component";

@Component({
    selector: 'app-settings-salons',
    templateUrl: './settings-salons.component.html',
    styleUrls: ['./settings-salons.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SettingsSalonsComponent implements OnInit {
    salons: Salon[];
    editFormData: any;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private chainService: ChainService,
        private salonService: SalonService) {
    }

    ngOnInit() {
        this.salonService
            .getSalons()
            .subscribe(
            (res: any) => this.renderSalons(res)
            );
    }

    renderSalons(salons: any): void {
        this.salons = salons;
    }

    openModalForm(form: any, inputs?: any): void {
        this.editFormData = {
            component: form,
            inputs: inputs || {}
        };
    }

    openCreateSalonForm(): void {
        this.openModalForm(CreateSalonComponent);
    }

    openEditSalonForm(salon: Salon): void {
        console.log(salon)
        this.openModalForm(EditSalonComponent, {
            salon: salon
        });
    }
}
