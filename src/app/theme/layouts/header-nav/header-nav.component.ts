import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { User } from "../../../auth/_models/user";
import {CreateSalonService} from "../../_services/create-salon.service";

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));

    salons = [];

    constructor(private createSalonService: CreateSalonService) {
    }

    ngOnInit() {
        this.getSalons();
    }

    ngAfterViewInit() {
        mLayout.initHeader();
    }

    getSalons() {
        this.createSalonService.getSalons()
            .subscribe(
                (response) => {
                    this.salons = response.data;
                }
            )
    }


}
