import { SalonSchedule } from "./salon-schedule.model";
import {UniqueEntity} from "../entity-collection/unique-entity";

export class Salon implements UniqueEntity {
    id: number;
    chain_id: number;

    title: string;
    img: string;

    country: string;
    city: string;
    streetNumber: string;
    address: string;
    latitude: number;
    longitude: number;

    currentTime: Date;

    notify_about_appointments: string[];
    schedule: SalonSchedule[];

    constructor(obj?: any) {
        this.id = obj && obj.id || 0;
        this.chain_id = obj && obj.chain_id || 0;
        this.title = obj && obj.title || '';
        this.img = obj && obj.img || '';

        this.country = obj && obj.country || '';
        this.city = obj && obj.city || '';
        this.streetNumber = obj && obj.streetNumber || '';
        this.address = obj && obj.address || '';

        this.latitude = obj && parseFloat(obj.latitude) || 55.7536207;
        this.longitude = obj && parseFloat(obj.longitude) || 37.6225599; //moscow, red square
        this.currentTime = obj && obj.currentTime || Date.now();

        this.notify_about_appointments = obj && obj.notify_about_appointments && obj.notify_about_appointments.filter(n => n) || [];
        this.schedule = obj && obj.schedule || this.createEmptySchedule();
    }

    createEmptySchedule(): SalonSchedule[] {
        let schedules = [];
        for(let i = 1; i < 8; i++) {
            schedules.push(new SalonSchedule({num_of_day: i}));
        }

        return schedules;
    }
}
