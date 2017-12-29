import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-employee-schedule',
    templateUrl: './employee-schedule.component.html',
    styleUrls: ['./employee-schedule.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EmployeeScheduleComponent implements OnInit, AfterViewInit {


    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        // table grid - make same height for cells from sidebar and container
        (function(){
            var sidebarRows = $('.table-grid-sidebar tbody tr'),
                containerRows = $('.table-grid-container tbody tr');

            function changeCellsHeight() {

                containerRows.each(function(){
                    var _this = $(this),
                        _thisIndex = _this.index(),
                        _thisHeight = _this.height(),
                        sidebarRow = sidebarRows.eq(_thisIndex),
                        sidebarRowHeight = sidebarRow.height();

                    // console.log(sidebarRowHeight + '_' + _thisHeight);

                    if (_thisHeight >= sidebarRowHeight) {
                        sidebarRow.height(_thisHeight);
                    } else {
                        _this.height(sidebarRowHeight);
                    }
                });
            }
            changeCellsHeight();

            $(window).resize(function(){
                changeCellsHeight();
            });
        }());
    }
}
