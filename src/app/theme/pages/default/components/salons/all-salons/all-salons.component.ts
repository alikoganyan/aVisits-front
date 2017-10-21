import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CreateSalonService} from "../../../../../_services/create-salon.service";

@Component({
    selector: 'app-all-salons',
    templateUrl: './all-salons.component.html',
    styleUrls: ['./all-salons.component.css']
})
export class AllSalonsComponent implements OnInit {

    salons = [];
    selectedSalon: any;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private createSalonService: CreateSalonService) {
    }

    ngOnInit() {
        this.getSalons();
    }

    redirectToCreateSalon() {
        this.router.navigate(['/components/salons/create-new-salon'], {relativeTo: this.route})
    }

    goToEditSalon(salon) {
        console.log(salon);
        // this.createSalonService.getEachSalonForEdit();
        this.router.navigate(['/components/salons/edit-salon/' + salon.id], {relativeTo: this.route})
    }

    getSalons() {
        this.createSalonService.getSalons()
            .subscribe(
                (response) => {
                    this.salons = response.data;
                    console.log(response.data)
                }
            )
    }

}
