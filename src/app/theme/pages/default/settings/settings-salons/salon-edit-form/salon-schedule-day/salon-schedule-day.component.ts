import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-salon-schedule-day',
  templateUrl: './salon-schedule-day.component.html',
  styleUrls: ['./salon-schedule-day.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SalonScheduleDayComponent implements OnInit {
  @Input() daySchedule: any;

  constructor() { }

  ngOnInit() {
  }

}
