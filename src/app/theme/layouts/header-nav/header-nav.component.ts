import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import {User} from "../../../auth/_models/user";


declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));

    salons = [
        {title: "Name Salon"},
        {title: "Name Salon"},
        {title: "Name Salon"},
        {title: "Name Salon"}
    ];

    constructor() {

    }
    ngOnInit() {
    }
    ngAfterViewInit() {

        mLayout.initHeader();

    }

}