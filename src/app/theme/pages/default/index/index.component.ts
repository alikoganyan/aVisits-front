import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./index.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class IndexComponent implements OnInit, AfterViewInit {


    constructor(private _script: ScriptLoaderService) {

    }

    ngOnInit() {
    }


     appointments = [{
         // Single resource of the "room" kind
         roomId: 1,              // Room 101 (id: 1)
         // Multiple resources of the "teacher" kind
         teacherId: [1, 2],    // Sandra Johnson (id: 1) and John Heart (id: 2)
         text: "Meeting",
         // ...
     },
         // ...
     ];
     resources = [
 
         // "Teacher" resource kind
         {
             fieldExpr: 'teacherId',
             dataSource: [
                 {
                     id: 1,
                     text: 'Sandra Johnson',
                     color: '#FF9747',
                     avatar: "images/gym/coach-man.png",
                     discipline: "ABS, Fitball, StepFit"
                 },
                 {
                     id: 2,
                     text: 'John Heart',
                     color: '#56CA85'
                 },
                 {
                     id: 3,
                     text: 'John Johnson',
                     color: '#337AB7'
                 },
                 // ...
             ],
             allowMultiple: true
         }
     ];
     currentDate = new Date(2017, 9, 13);


    ngAfterViewInit() {
    }

}