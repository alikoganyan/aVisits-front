import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";
import {Message} from "primeng/primeng";

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit, AfterViewInit {

    constructor(private _script: ScriptLoaderService) { }

    msgs: Message[];
    index: number = 0;
    public save;
    public items;

    ngOnInit() {
    }

    onTabClose(event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Tab Closed', detail: 'Index: ' + event.index });
    }

    onTabOpen(event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Tab Expanded', detail: 'Index: ' + event.index });
    }



    ngAfterViewInit() {
        this._script.load('app-service',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js');
        this._script.load('app-service',
            'assets/demo/default/custom/components/datatables/base/data-ajax.js');

    }

}
