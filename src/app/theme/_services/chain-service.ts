import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Subject} from "rxjs/Subject";


@Injectable()
export class ChainService {

    private currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getChains() {
        return this.http.get(
            'http://api.avisits.com/api/chain?token=' + this.currentUser.token)
            .map((response: Response) => {
                let data = response.json();
                return data;
            })
    }

    createChain(chain) {
        return this.http.post(
            'http://api.avisits.com/api/chain?token=' + this.currentUser.token,
            JSON.stringify(chain),
            {headers: this.headers})
            .map((response: Response) => {
                let data = response.json();
                return data;
            })
    }

    getChain(id: number) {
        return this.http.get(
            'http://api.avisits.com/api/chain/'+ id +'?token=' + this.currentUser.token)
            .map((response: Response) => {
                let data = response.json();
                return data;
            })
    }

    editChain(chain: any) {
        return this.http.put(
            'http://api.avisits.com/api/chain/'+ chain.id +'?token=' + this.currentUser.token,
            JSON.stringify(chain),
            {headers: this.headers}
            )
            .map((response: Response) => {
                let data = response.json();
                return data;
            })
    }

    deleteChain(id: number) {
        return this.http.delete(
            'http://api.avisits.com/api/chain/'+ id +'?token=' + this.currentUser.token,
        )
            .map((response: Response) => {
                let data = response.json();
                return data;
            })
    }

}