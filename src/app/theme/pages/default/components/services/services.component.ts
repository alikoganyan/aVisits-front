import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CreateServicesService} from "../../../../_services/create-services.service";
import {CustomFormValidate} from "./helpers/custom-form-validate";
import {ScriptLoaderService} from "../../../../../_services/script-loader.service";


@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

    serviceSwitch = 'categoryService';
    categoryServiceName = '';
    serviceCategories: any;
    groups = [];
    aaabbb = [{}, {}, {}, {}];
    @ViewChild('modalStatus') hideModal: ElementRef;
    @ViewChild('selectCategory') cat: ElementRef;


    constructor(private createServicesService: CreateServicesService,
                private _script: ScriptLoaderService) {
    }

    serviceSwitcher(serviceSwitch: string) {
        this.serviceSwitch = serviceSwitch;
    }

    ngOnInit() {
        // this.getServiceCategories();
        this.getServiceGroups();
        this.getAllServiceGroupsCategories();
        // CustomFormValidate.init();
    }


    getAllServiceGroupsCategories() {
        this.createServicesService.getAllServiceGroupsCategories()
            .subscribe(
                (response) => {
                    this.serviceCategories = response.data.categories;
                    // console.log(response);
                    console.log(response.data.categories);
                    console.log(response.data.categories[0].groups[0].title);
                }
            )
    }

    /*getServiceCategories() {
        this.createServicesService.getServiceCategories()
            .subscribe(
                (response) => {
                    this.serviceCategories = response.data;
                    console.log(response.data)
                }
            )
    }*/

    getServiceGroups() {
        this.createServicesService.getGroups()
            .subscribe(
                (response) => {
                    this.groups = response.data.groups;
                }
            )
    }

    signupFormCategoryService() {
        this.createServicesService.createCategoryService(this.categoryServiceName)
            .subscribe(
                (response) => {
                    this.serviceCategories.push(response.data);
                    this.hideModal.nativeElement.attributes[2].nodeValue = '';
                }
            );
        // console.log(this.hideModal.nativeElement.attributes[2].nodeValue);
    }

    signupFormGroupService(groupServicename: string, id: number) {
        this.createServicesService.createServiceGroups(groupServicename, id)
            .subscribe(
                (response) => {
                    let index = this.cat.nativeElement.selectedOptions[0].id;
                    console.log(response.data, index);
                    this.serviceCategories[index].groups.push(response.data)
                }
            )
        // console.log(this.cat.nativeElement[2].dataset.index);
        // console.log(index.nativeElement.dataset.index);
    }

}

