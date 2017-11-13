import { SalonSchedule } from "./salon-schedule.model";

export class Salon {
    id: string;
    chain_id: number;

    title: string;
    image: string;

    country: string;
    city: string;
    streetNumber: string;
    address: string;
    latitude: number;
    longitude: number;

    currentTime: Date;

    schedule: SalonSchedule[];

    constructor(obj?: any) {
        this.id = obj && obj.id || "";
        this.chain_id = obj && obj.chain_id || 0;
        this.title = obj && obj.title || '';
        this.image = obj && obj.image || '';
        this.city = obj && obj.city || '';
        this.streetNumber = obj && obj.streetNumber || '';
        this.address = obj && obj.address || '';
        this.latitude = obj && obj.latitude || 59.327;
        this.longitude = obj && obj.longitude || 18.067;
        this.currentTime = obj && obj.currentTime || Date.now();
        this.schedule = obj && obj.schedule || this.createEmptySchedule();
    }

    createEmptySchedule(): SalonSchedule[] {
        return [
            new SalonSchedule(1),
            new SalonSchedule(2),
            new SalonSchedule(3),
            new SalonSchedule(4),
            new SalonSchedule(5),
            new SalonSchedule(6),
            new SalonSchedule(7)
        ]
    }
}
