import { Injectable } from '@angular/core';
import { BackendService } from "../backend/backend.service";
import { Observable } from "rxjs/Observable";
import { Chain } from "../chain/chain.model";
import { ChainService } from "../chain/chain.service";
import { Salon } from "./salon.model";
import { AuthenticationService } from "../auth/_services/authentication.service";
import { UserService } from "../auth/_services/user.service";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class SalonService {
    private currentChainId: number;
    private editedSalonSubject = new BehaviorSubject<any>(null);
    private salonSavedSubject = new Subject<any>();
    private salonDeletedSubject = new Subject<any>();
    private salonFailedSubject = new Subject<any>();

    editedSalon = this.editedSalonSubject.asObservable();
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

    getSalonsGeneralData(): Observable<any> {
        return this.chainService
            .getChains()
            .map(chains => {
                return chains.reduce((acc, item) => {
                    return acc.concat(item.salons);
                }, []);
            })
            .map(salons => salons.map(salon => new Salon(salon)))
    }

    getSalonById(id): Observable<any> {
        return this.backend.get(`${this.currentChainId}/salon/${id}`)
            .map(res => res.json().data)
            .map(data => new Salon(data));
    }

    getSalonsForChain(chain: Chain): Observable<any> {
        return this.backend.get(`${chain.id}/salon`);
    }

    createSalon(salon: Salon): Subscription {
        return this.backend.post(`${this.currentChainId}/salon`, salon)
            .subscribe(
            next => this.salonSavedSubject.next(next),
            err => this.salonFailedSubject.next(err),
                () => this.editedSalonSubject.next(null)
            );
    }

    updateSalon(salon: Salon): Subscription {
        return this.backend.put(`${salon.chain_id}/salon`, salon)
            .subscribe(
            next => this.salonSavedSubject.next(next),
            err => this.salonFailedSubject.next(err),
                () => this.editedSalonSubject.next(null)
            )
    }

    delete(salon: Salon): Subscription {
        return this.backend.delete(`${salon.chain_id}/salon/${salon.id}`)
            .subscribe(
            next => this.salonDeletedSubject.next(next),
            err => this.salonFailedSubject.next(err),
                () => this.editedSalonSubject.next(null)
            )
    }

    setEditedSalon(salon: Salon): void {
        this.editedSalonSubject.next(salon);
    }

    public notificationTypes: any[] = [
        { key: "1h11", title: 'В день визита за 1 час, не позже 11' },
        { key: "2h11", title: 'В день визита за 2 час, не позже 11' },
        { key: "3h11", title: 'В день визита за 3 час, не позже 11' },
        { key: "1d19", title: 'За 1 день в 19 часов' },
        { key: "1d12", title: 'За 1 день в 12 часов' },
        { key: "2d12", title: 'За 2 дня в 12 часов' },
        { key: "3d12", title: 'За 3 дня в 12 часов' },
        { key: "7d12", title: 'За 7 дней в 12 часов' },
    ];
}
