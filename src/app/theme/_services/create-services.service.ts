import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";


@Injectable()
export class CreateServicesService {

    constructor(private http: Http) {

    }

    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private headers = new Headers({'Content-Type': 'application/json'});

    getAllServiceGroupsCategories() {
        return this.http.get('http://api.avisits.com/api/' + this.currentUser.chain.id + '/category-groups?token=' + this.currentUser.token)
            .map(
                (response: Response) => {
                    let data = response.json();
                    return data;
                }
            )
    }

    getServiceCategories() {
        return this.http.get('http://api.avisits.com/api/' + this.currentUser.chain.id + '/service_category?token=' + this.currentUser.token)
            .map(
                (response: Response) => {
                    let data = response.json();
                    return data;
                }
            )
    }

    getGroups() {
        return this.http.get('http://api.avisits.com/api/' + this.currentUser.chain.id + '/service_groups?token=' + this.currentUser.token)
            .map(
                (response: Response) => {
                    let data = response.json();
                    return data;
                }
            )
    }

    createCategoryService(title: string) {
        return this.http.post(
            'http://api.avisits.com/api/' + this.currentUser.chain.id + '/service_category?token=' + this.currentUser.token,
            {title: title},
            {headers: this.headers}
        )
            .map(
                (response: Response) => {
                    let data = response.json();
                    return data;
                }
            )
    }

    createServiceGroups(title: string, id: number) {
        return this.http.post(
            'http://api.avisits.com/api/' + this.currentUser.chain.id + '/service_category?token=' + this.currentUser.token,
            {title: title, parent_id: id},
            {headers: this.headers}
        )
            .map(
                (response: Response) => {
                    let data = response.json();
                    return data;
                }
            )
    }

    createService(title: string, id: number, duration: number) {
        return this.http.post(
            'http://api.avisits.com/api/' + this.currentUser.chain.id + '/service?token=' + this.currentUser.token,
            {title: title, service_category_id: id, duration: duration, chain_id: this.currentUser.chain.id},
            {headers: this.headers}
        )
            .map(
                (response: Response) => {
                    let data = response.json();
                    return data;
                }
            )
    }


}



