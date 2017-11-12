import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Salon} from "../../../../../../salon/salon.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-salon-row',
    templateUrl: './salon-row.component.html',
    styleUrls: ['./salon-row.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SalonRowComponent implements OnInit {
    @Input() salon: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    getSalonAddress(): string {
        return `${this.salon.city}, ${this.salon.address}`;
    }

    editSalon(): void {
        this.router.navigate(['./edit', this.salon.id], {relativeTo: this.route});
    }

}
