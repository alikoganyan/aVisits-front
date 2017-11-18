import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router, NavigationStart, NavigationEnd, ActivatedRoute} from '@angular/router';
import { Helpers } from "./helpers";
import {NavTitleService} from "./shared/layouts/header-nav/nav-title.service";

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    title = 'app';
    globalBodyClass = 'm-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default';

    constructor(private router: Router,
                private route: ActivatedRoute,
                private navTitleService: NavTitleService) {
    }

    ngOnInit() {
        this.router.events.subscribe((route) => {
            if (route instanceof NavigationStart) {
                Helpers.setLoading(true);
                Helpers.bodyClass(this.globalBodyClass);
            }
            if (route instanceof NavigationEnd) {
                Helpers.setLoading(false);
            }
        });

        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.route)
            .map((route) => {
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route; // the last activated route
            })
            .mergeMap((route) => route.data)
            .subscribe(data => {
                if(data.title) {
                    this.navTitleService.setTitle(data.title);
                }
            })
    }
}