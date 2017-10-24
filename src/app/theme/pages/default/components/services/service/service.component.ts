import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ScriptLoaderService } from "../../../../../../_services/script-loader.service";
import { NgForm } from "@angular/forms";
import { CreateServicesService } from "../../../../../_services/create-services.service";
import { AlertComponent } from "../../../../../../auth/_directives/alert.component";
import { AlertService } from "../../../../../../auth/_services/alert.service";


@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit, AfterViewInit {
    serviceCategories = [];
    serviceGroups = [];
    loading = false;

    @ViewChild('salonCreated', { read: ViewContainerRef }) salonCreated: ViewContainerRef;

    constructor(private _script: ScriptLoaderService,
        private createServicesService: CreateServicesService,
        private cfr: ComponentFactoryResolver,
        private _alertService: AlertService) {
    }

    ngOnInit() {
        this.getServiceCategories();
        // this.getGroups();
    }

    getServiceCategories() {
        this.createServicesService.getServiceCategories()
            .subscribe(
                (data) => {
                    this.serviceCategories = data.data.categories;
                })
    }

    getGroupsService(id: number) {
        this.createServicesService.getGroupsService(id)
            .subscribe(
                (data) => {
                    this.serviceGroups = data.data.groups;
                })
    }

   /* getGroups() {
        this.createServicesService.getGroups()
            .subscribe(
            (data) => {
                this.groups = data.data.groups;
            })
    }*/

    onSubmit(form: NgForm) {
        this.loading = true;
        /*console.log(
            form.value,
            form.value.group,
            form.value.available_for_online_recording,
            form.value.onlyForOnline
        );*/
        this.createServicesService.createService(
            form.value.title,
            form.value.group,
            form.value.duration
        ).subscribe(
            (data) => {
                form.reset();
                this.showAlert('salonCreated');
                this._alertService.success('Вы создали услугу!');
            },
            (error) => {
                this.showAlert('salonCreated');
                this._alertService.error('Проблемы с сервером!');
            }
            );
    }

    ngAfterViewInit() {
        this._script.load('app-service',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-datepicker.js',
            'assets/demo/default/custom/components/forms/widgets/bootstrap-touchspin-service-prices.js',
            'assets/demo/default/custom/components/datatables/base/data-ajax.js');
    }


    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

}
