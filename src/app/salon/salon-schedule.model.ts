export class SalonSchedule {
    id: string;
    num_of_day: string;
    working_status: boolean;
    start: string;
    end: string;

    constructor(obj?: any) {
        this.num_of_day = obj && obj.num_of_day || 1;
        this.start = obj && obj.start || "10:00";
        this.end = obj && obj.end || "19:00";
        this.working_status = obj && obj.working_status || 1;
    }
}
