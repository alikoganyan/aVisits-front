import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {JsDateToTimeStringPipe} from "./js-date-to-time-string.pipe";

@Component({
    selector: 'app-salon-schedule-day',
    templateUrl: './salon-schedule-day.component.html',
    styleUrls: ['./salon-schedule-day.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SalonScheduleDayComponent implements OnInit {
    @Input() daySchedule: any;

    constructor(private jsDateToTime: JsDateToTimeStringPipe) { }

    ngOnInit() {
    }

    onStartChanged($event) {
        this.daySchedule.start = this.jsDateToTime.transform($event.value);
    }
    onEndChanged($event) {
        this.daySchedule.end = this.jsDateToTime.transform($event.value);
    }
}
