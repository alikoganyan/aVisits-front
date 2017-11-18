import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";

import { User } from "../_models/index";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { BackendService } from "../../backend/backend.service";
import {AuthenticationService} from "./authentication.service";
import {BackendBaseService} from "../../backend/backend-base.service";

@Injectable()
export class UserService {
    currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

    constructor(private backend: BackendBaseService) {
    }

    setCurrentUser(newUser: User): void {
        this.currentUser.next(newUser);
    }

    create(user: User) {
        return this.backend.post('user/signup', user)
            .map((response: Response) => response.json());
    }

    update(user: User) {
        return this.backend.put('users/' + user.id, user).map((response: Response) => response.json());
    }

}