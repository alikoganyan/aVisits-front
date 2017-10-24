import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";


@Injectable()
export class EmployeeService {

    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) {
    }

    addEmployee(first_name: string, last_name: string, father_name: string, email: string, phone: string, position_id: number) {
        return this.http.post(
            'http://api.avisits.com/api/' + this.currentUser.chain.id + '/employee?token=' + this.currentUser.token,
            {
                first_name: first_name,
                last_name: last_name,
                father_name: father_name,
                email: email,
                phone: phone,
                position_id: position_id
            },
            { headers: this.headers }
        )
            .map(
            (response: Response) => {
                let data = response.json();
                return data;
            })
    }

    getEmployees() {
        return this.http.get('http://api.avisits.com/api/' + this.currentUser.chain.id + '/employee?token=' + this.currentUser.token)
            .map(
            (response: Response) => {
                let data = response.json();
                return data;
            })
    }

    getEmployee(id: number) {
        return this.http.get('http://api.avisits.com/api/' + this.currentUser.chain.id + '/employee/' + id + '?token=' + this.currentUser.token)
            .map(
            (response: Response) => {
                let data = response.json();
                return data;
            })
    }

    editEmployee(form, id: number) {
        return this.http.put(
            'http://api.avisits.com/api/' + this.currentUser.chain.id + '/employee/' + id + '?token=' + this.currentUser.token,
            {
                first_name: form.name,
                last_name: form.surname,
                father_name: form.fatherName,
                email: form.email
            },
            {
                headers: this.headers
            }
        )
            .map(
            (response: Response) => {
                let data = response.json();
                return data;
            })
    }

    deleteEmployee(id: number) {
        return this.http.delete(
            'http://api.avisits.com/api/' + this.currentUser.chain.id + '/employee/' + id + '?token=' + this.currentUser.token
        )
            .map(
            (response: Response) => {
                let data = response.json();
                return data;
            })
    }

}
