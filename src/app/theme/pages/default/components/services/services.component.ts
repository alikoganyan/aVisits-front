import { Component, OnInit } from '@angular/core';
import { Message } from "primeng/primeng";

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

    msgs: Message[];
    index: number = 0;
    public items;

    constructor() {
    }

    ngOnInit() {
    }

    getService() {
    }

    getText(name) {
        console.log(name);
    }

    onTabClose(event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Tab Closed', detail: 'Index: ' + event.index });
    }

    onTabOpen(event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Tab Expanded', detail: 'Index: ' + event.index });
    }
}
