import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Salon } from "../../../../../../salon/salon.model";
import { ActivatedRoute, Router } from "@angular/router";
import {ChainService} from "../../../../../../chain/chain.service";

@Component({
    selector: 'app-salon-row',
    templateUrl: './salon-row.component.html',
    styleUrls: ['./salon-row.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SalonRowComponent implements OnInit {
    @Input() salon: any;
    chainName: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private chainService: ChainService
    ) {
    }

    ngOnInit() {
        this.chainService.getChainById(this.salon.chain_id)
            .subscribe(
                chain => this.chainName = chain.title
            );
    }

    getSalonAddress(): string {
        return `${this.salon.city}, ${this.salon.address}`;
    }

    editSalon(): void {
        this.router.navigate(['./edit', this.salon.id], { relativeTo: this.route });
    }

}