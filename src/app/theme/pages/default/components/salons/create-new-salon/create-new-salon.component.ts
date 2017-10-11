import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";

declare let Dropzone: any;

@Component({
  selector: 'app-create-salon',
  templateUrl: './create-new-salon.component.html',
  styleUrls: ['./create-new-salon.component.css']
})
export class CreateNewSalonComponent implements OnInit, AfterViewInit {

    showWeekdays: any = [
        {
            show: false,
            weekDay: 'Пн',
        },
        {
            show: false,
            weekDay: 'Вт',
        },
        {
            show: false,
            weekDay: 'Ср',
        },
        {
            show: false,
            weekDay: 'Чт',
        },
        {
            show: false,
            weekDay: 'Пт',
        },
        {
            show: false,
            weekDay: 'Сб',
        },
        {
            show: false,
            weekDay: 'Вс',
        }
    ];

  constructor(private _script: ScriptLoaderService) { }

    onChange(showWeekday) {
        showWeekday.show = !showWeekday.show;
        this._script.load('app-create-salon',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-select.js');
    }

  ngOnInit() {
  }

  ngAfterViewInit() {
      this._script.load('app-create-salon',
          'assets/demo/default/custom/components/forms/widgets/bootstrap-select.js');
      Dropzone._autoDiscoverFunction();
  }

}

