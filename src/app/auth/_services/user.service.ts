import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";

import { User } from "../_models/index";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { BackendService } from "../../backend/backend.service";

@Injectable()
export class UserService {
    currentUser: Subject<User> = new BehaviorSubject<User>(new User());

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
        return this.http.post('/api/forgot-password', JSON.stringify({ email })).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('/api/users', user).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user).map((response: Response) => response.json());
    }
}