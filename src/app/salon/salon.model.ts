import { SalonSchedule } from "./salon-schedule.model";

export class Salon {
    title: string;
    image: string;

    country: string;
    city: string;
    streetNumber: string;
    address: string;
    latitude: string;
    longitude: string;

    currentTime: Date;

    schedule: SalonSchedule[];

    constructor(obj?: any) {
        this.title = obj && obj.title || '';
        this.image = obj && obj.image || '';
        this.city = obj && obj.city || '';
        this.streetNumber = obj && obj.streetNumber || '';
        this.address = obj && obj.address || '';
        this.latitude = obj && obj.latitude || '';
        this.longitude = obj && obj.longitude || '';
        this.currentTime = obj && obj.currentTime || Date.now();
        this.schedule = obj && obj.schedule || new SalonSchedule();

    }
}
