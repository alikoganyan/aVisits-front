import { Injectable } from '@angular/core';
import { BackendService } from "../backend/backend.service";
import { Observable } from "rxjs/Observable";
import { Chain } from "../chain/chain.model";
import { ChainService } from "../chain/chain.service";
import { Salon } from "./salon.model";
import { AuthenticationService } from "../auth/_services/authentication.service";
import { UserService } from "../auth/_services/user.service";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class SalonService {
    private currentChainId: number;
    private salonSavedSubject = new Subject<any>();
    private salonDeletedSubject = new Subject<any>();
    private salonFailedSubject = new Subject<any>();

    salonSaved = this.salonSavedSubject.asObservable();
    salonDeleted = this.salonDeletedSubject.asObservable();
    salonFailed = this.salonFailedSubject.asObservable();

    constructor(
        private backend: BackendService,
        private authService: AuthenticationService,
        private chainService: ChainService
    ) {
        this.authService.currentAuthData.subscribe(
            authData => this.currentChainId = authData.chain.id
        )
    }

    getSalons(): Observable<any> {
        return this.chainService
            .getChains()
            .map(chains => {
                return chains.reduce((acc, item) => {
                    return acc.concat(item.salons);
                }, []);
            })
            .map(salons => salons.map(salon => {
                salon.latitude = parseInt(salon.latitude);
                salon.longitude = parseInt(salon.longitude)
                return salon;
            }))
    }

    getSalonById(id): Observable<any> {
        return this.getSalons()
            .map(salons => salons.filter(s => s.id == id)[0]);
    }

    getSalonsForChain(chain: Chain): Observable<any> {
        return this.backend.get(`${chain.id}/salon`);
    }

    createSalon(salon: Salon): Subscription {
        return this.backend.post(`${this.currentChainId}/salon`, salon)
            .subscribe(
                next => this.salonSavedSubject.next(next),
                err => this.salonFailedSubject.next(err)
            );
    }

    updateSalon(salon: Salon): Subscription {
        return this.backend.put(`${salon.chain_id}/salon`, salon)
            .subscribe(
                next => this.salonSavedSubject.next(next),
                err => this.salonFailedSubject.next(err)
            )
    }

    delete(salon: Salon): Subscription {
        return this.backend.delete(`${salon.chain_id}/salon/${salon.id}`)
            .subscribe(
                next => this.salonDeletedSubject.next(next),
                err => this.salonFailedSubject.next(err)
            )
    }

    public firstNotificationTypes: any[] = [
            { id: 0, title: 'В день визита за 1 час, не позже 11'},
            { id: 1, title: 'В день визита за 2 час, не позже 11'},
            { id: 2, title: 'В день визита за 3 час, не позже 11'},
            { id: 3, title: 'За 1 день в 19 часов'},
            { id: 4, title: 'За 1 день в 12 часов'},
            { id: 5, title: 'За 2 дня в 12 часов'},
            { id: 6, title: 'За 3 дня в 12 часов'},
            { id: 7, title: 'За 7 дней в 12 часов'},
        ];
}
