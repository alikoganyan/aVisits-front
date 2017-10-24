import {Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CreateServicesService} from "../../../../_services/create-services.service";
import {AlertService} from "../../../../../auth/_services/alert.service";
import {AlertComponent} from "../../../../../auth/_directives/alert.component";


@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

    serviceSwitch = 'categoryService';
    categoryServiceName = '';
    serviceCategories: any;
    serviceEditSwitcher = false;
    serviceEditTitle = '';
    @ViewChild('selectCategory') cat: ElementRef;
    @ViewChild('groupService', {read: ViewContainerRef}) groupService: ViewContainerRef;
    selectedCategoryServiceTitle = '';
    selectedGroupServiceTitle = '';
    showEditInputCategory = false;
    showEditInputGroup = false;

    constructor(private createServicesService: CreateServicesService,
                private _alertService: AlertService,
                private cfr: ComponentFactoryResolver) {
    }

    serviceSwitcher(serviceSwitch: string) {
        this.serviceSwitch = serviceSwitch;
    }

    ngOnInit() {
        this.getAllServiceGroupsCategories();
    }

    getAllServiceGroupsCategories() {
        this.createServicesService.getAllServiceGroupsCategories()
            .subscribe(
                (response) => {
                    this.serviceCategories = response.data.categories;
                    // console.log(response);
                    // console.log(response.data.categories);
                    // console.log(response.data.categories[0].groups[0].title);
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

    /*getServiceGroups() {
        this.createServicesService.getGroups()
            .subscribe(
                (response) => {
                    this.groups = response.data.groups;
                }
            )
    }*/

    signupFormCategoryService() {
        this.createServicesService.createCategoryService(this.categoryServiceName)
            .subscribe(
                (response) => {
                    console.log(this.serviceCategories);
                    this.serviceCategories.push(response.data);
                    this.categoryServiceName = '';
                }
            );
    }

    signupFormGroupService(groupServicename: string, id) {
        let catId = parseInt(id);
        if (id.length >= 25) {
            console.log(1);
            this.showAlert('groupService');
            this._alertService.error('Добавьте групу услуг!');
        }
        else if (groupServicename == '') {
            this.showAlert('groupService');
            this._alertService.error('Название групы абизателен!');
        }
        else {
            this.createServicesService.createServiceGroups(groupServicename, catId)
                .subscribe(
                    (response) => {
                        console.log(response);
                        let index = this.cat.nativeElement.selectedOptions[0].id;
                        // console.log(response.data, index);
                        this.serviceCategories[index].groups.push(response.data)
                    }
                )
        }
        // console.log(this.cat.nativeElement[2].dataset.index);
        // console.log(index.nativeElement.dataset.index);
    }

    onEditService(service) {
        this.serviceEditSwitcher = true;
        this.serviceEditTitle = service.title;
    }

    onSaveEditService(service) {
        this.serviceEditSwitcher = false;
    }

    onDeleteService(id: number) {
        this.createServicesService.deleteService(id)
            .subscribe(
                (response) => {
                    if (response.success == 1) {
                        for (let serviceCategory of this.serviceCategories) {
                            for (let serviceGroup of serviceCategory.groups) {
                                for (let i in serviceGroup.services) {
                                    if (serviceGroup.services[i].id == id) {
                                        serviceGroup.services.splice(i, 1);
                                    }
                                }
                            }
                        }
                    }
                }
            )
    }

    editServiceCategory(serviceCategory) {
        this.selectedCategoryServiceTitle = serviceCategory.title;
        this.showEditInputCategory = true;
    }

    saveEditServiceCategory(serviceCategory) {
        serviceCategory.title = this.selectedCategoryServiceTitle;
        this.createServicesService.editCategoryService(serviceCategory)
            .subscribe(
                (response) => {
                    this.showEditInputCategory = false;
                }
            )
    }

    deleteServiceCategory(serviceCategory) {
        for (let i in this.serviceCategories) {
            if (this.serviceCategories[i].id == serviceCategory.id) {
                if (this.serviceCategories[i].groups.length > 0) {
                    let result = confirm("В категории услуг есть группы услуг вы уверены что хотите удалить категорию услуг?");
                    if (result) {
                        this.createServicesService.deleteCategoryService(serviceCategory.id)
                            .subscribe(
                                (response) => {
                                    console.log(response);
                                    this.serviceCategories.splice(i, 1);
                                }
                            );
                    }
                } else {
                    this.createServicesService.deleteCategoryService(serviceCategory.id)
                        .subscribe(
                            (response) => {
                                console.log(response);
                                this.serviceCategories.splice(i, 1);
                            });
                }
            }
        }
    }

    editGroupCategory(group) {
        this.showEditInputGroup = true;
        this.selectedGroupServiceTitle = group.title;
    }

    saveEditGroupCategory(group) {
        group.title = this.selectedGroupServiceTitle;
        this.createServicesService.editGroupService(group)
            .subscribe(
                (response) => {
                    console.log(response);
                    this.showEditInputGroup = false;
                }
            );
    }

    deleteGroupCategory(group) {
        for (let serviceCategory of this.serviceCategories) {
            for (let i in serviceCategory.groups) {
                if (serviceCategory.groups[i].id == group.id) {
                    if (serviceCategory.groups[i].services.length > 0) {
                        let result = confirm("В группе услуг есть услуги вы уверены что хотите удалить групу услуг?");
                        if (result) {
                            this.createServicesService.deleteGroupService(group.id)
                                .subscribe(
                                    (response) => {
                                        /*  for (let serviceCategory of this.serviceCategories) {
                                              for (let i in serviceCategory.groups) {
                                                  if (serviceCategory.groups[i].id == group.id) {

                                                  }
                                              }
                                          }*/
                                        serviceCategory.groups.splice(i, 1);
                                    }
                                );
                        }
                    } else {
                        this.createServicesService.deleteGroupService(group.id)
                            .subscribe(
                                (response) => {
                                    for (let serviceCategory of this.serviceCategories) {
                                        /*for (let i in serviceCategory.groups) {
                                            if (serviceCategory.groups[i].id == group.id) {

                                            }
                                        }*/
                                        serviceCategory.groups.splice(i, 1);
                                    }
                                }
                            );
                    }

                }
            }
        }

    }

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
}

