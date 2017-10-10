import {Component, OnInit} from '@angular/core';
import {CreateServicesService} from "../../../../_services/create-services.service";
import {Message} from "primeng/primeng";

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

    // msgs: Message[];

    serviceCategories = [{title: "AAA"}, {title: "BBB"}, {title: "CCC"}];

    constructor(private createServicesService: CreateServicesService) {
    }

    ngOnInit() {
        this.getServiceCategories();
    }

    getServiceCategories() {
        this.createServicesService.getServiceCategories()
            .subscribe(
                (response) => {
                    this.serviceCategories = response;
                }
            )
    }

      /*  onTabClose(event) {
            this.msgs = [];
            this.msgs.push({ severity: 'info', summary: 'Tab Closed', detail: 'Index: ' + event.index });
            console.log(this.msgs);
        }

        onTabOpen(event) {
            this.msgs = [];
            this.msgs.push({ severity: 'info', summary: 'Tab Expanded', detail: 'Index: ' + event.index });
            console.log(this.msgs);
        }*/
}
