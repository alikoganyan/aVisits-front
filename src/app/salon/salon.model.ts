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
        let schedules = [];
        for(let i = 1; i < 8; i++) {
            schedules.push(new SalonSchedule({num_of_day: i}));
        }

        return schedules;
    }
}
