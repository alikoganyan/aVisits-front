import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class NavTitleService {
    public title: BehaviorSubject<string> = new BehaviorSubject('');

    constructor() {
    }

    setTitle(newTitle: string): void {
        this.title.next(newTitle);
    }

}
