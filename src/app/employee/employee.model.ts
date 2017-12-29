import {UniqueEntity} from "../entity-collection/unique-entity";

export class Employee implements UniqueEntity {
    id: number;

    first_name: string;
    last_name: string;
    father_name: string;

    photo: string;
    birthday: Date;
    email: string;
    phone: string;
    address: string;
    position_id: number;
    public_position: string;
    comment: string;

    employment_date: Date;
    dismissed: boolean;
    date_dismissed: Date;

    displayed_in_records: boolean;
    available_for_online_recording: boolean;

    schedule: Array<any>;

    salonIds: Array<any>;

    constructor(obj?: any) {
        obj = obj || {};

        this.id = obj.id || null;
        this.first_name = obj.first_name || '';
        this.last_name = obj.last_name || '';
        this.father_name = obj.father_name || '';

        this.photo = obj.photo || '';
        this.birthday = obj.birthday || null;
        this.email = obj.email || '';
        this.phone = obj.phone || '';

        this.employment_date = obj.employment_date || null;
        this.dismissed = obj.dismissed || false;
        this.date_dismissed = obj.date_dismissed || null;

        this.displayed_in_records = obj.displayed_in_records || false;
        this.available_for_online_recording = obj.available_for_online_recording || false;

        this.address = obj.address || '';
        this.position_id = obj.position_id || null;
        this.public_position = obj.public_position || '';
        this.comment = obj.comment || '';

        this.schedule = obj.schedule || [];

        this.salonIds = obj.salonIds || [];
    }
}