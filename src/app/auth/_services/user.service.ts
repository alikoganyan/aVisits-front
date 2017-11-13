import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";

import { User } from "../_models/index";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { BackendService } from "../../backend/backend.service";

@Injectable()
export class UserService {
    currentUser: Subject<User> = new BehaviorSubject<User>(new User());
    apiUrl: string = BackendService.apiUrl;
    headers: Headers = BackendService.headers;

    constructor(private http: Http) {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            this.setCurrentUser(user);
        }
    }

    setCurrentUser(newUser: User): void {
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        this.currentUser.next(newUser);
    }

    forgotPassword(email: string) {
        return this.http.post(this.apiUrl + 'forgot-password', JSON.stringify({ email })).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(this.apiUrl + 'user/signup', user, { headers: this.headers })
            .map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put(this.apiUrl + 'users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}