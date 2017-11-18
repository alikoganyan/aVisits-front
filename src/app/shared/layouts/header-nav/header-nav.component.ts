import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import {NavTitleService} from "./nav-title.service";

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
    title: string;

    constructor(private navTitleService: NavTitleService) {
        navTitleService.title.subscribe(
            (title) => this.title = title
        );
    }
    ngOnInit() {

    }
    ngAfterViewInit() {

        mLayout.initHeader();

    }

}