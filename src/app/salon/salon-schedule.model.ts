export class SalonSchedule {
    id: string;
    numOfDay: string;
    workingStatus: boolean;
    start: string;
    end: string;

    constructor(obj?: any) {
        this.numOfDay = obj && obj.numOfDay || 0;
        this.start =    obj && obj.start || "10:00";
        this.end =      obj && obj.end || "19:00";
    }
}
