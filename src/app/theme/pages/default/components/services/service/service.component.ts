import {
    AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewChildren,
    ViewContainerRef
} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ScriptLoaderService} from "../../../../../../_services/script-loader.service";
import {CreateServicesService} from "../../../../../_services/create-services.service";
import {AlertComponent} from "../../../../../../auth/_directives/alert.component";
import {AlertService} from "../../../../../../auth/_services/alert.service";
import {ChainService} from "../../../../../_services/chain-service";


@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit, AfterViewInit {
    serviceCategories = [];
    serviceGroups = [];
    loading = false;
    chainPrices: any;
    currentUser = JSON.parse(localStorage.getItem('currentUser'));

    @ViewChildren('start') startInputs;
    @ViewChildren('end') endInputs;
    @ViewChild('salonCreated', {read: ViewContainerRef}) salonCreated: ViewContainerRef;

    constructor(private _script: ScriptLoaderService,
                private createServicesService: CreateServicesService,
                private cfr: ComponentFactoryResolver,
                private _alertService: AlertService,
                private chainService: ChainService) {
    }

    ngOnInit() {
        this.getServiceCategories();
        this.getCurrentChain();


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

    getCurrentChain() {
        this.chainService.getChain(this.currentUser.chain.id)
            .subscribe(
                (response) => {
                    // console.log(response);
                    this.chainPrices = response.data.chain.levels;
                }
            )
    }

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }



    logic() {

        for (let i in this.chainPrices) {
            this.endInputs._results[i].nativeElement.valueAsNumber = this.startInputs._results[i].nativeElement.valueAsNumber;
            this.endInputs._results[i].nativeElement.min = this.endInputs._results[i].nativeElement.valueAsNumber;
        }
        console.log(this.startInputs._results[0].nativeElement.min);
        // console.log(this.endInputs._results[0].nativeElement.valueAsNumber);
    }


}
