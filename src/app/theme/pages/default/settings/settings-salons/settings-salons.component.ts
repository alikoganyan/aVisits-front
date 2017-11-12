import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SalonService} from "../../../../../salon/salon.service";
import {ChainService} from "../../../../../chain/chain.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Salon} from "../../../../../salon/salon.model";

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

    redirectToCreateSalon(): void {
        this.router.navigate(['./create'], {relativeTo: this.route})
    }
}
