import {UniqueEntity} from "../entity-collection/unique-entity";

export class SalonServiceModel implements UniqueEntity {
    id: number;
    title: string;
    description: string;
    service_category_id: number;
    duration: string;
    price: any;

    constructor(obj?: any) {
        if(obj) {
            this.id = obj.id || null;
            this.title = obj.title || '';
            this.description = obj.description || '';
            this.service_category_id = obj.service_category_id || '';
            this.duration = obj.duration || '';
            this.price = obj.price || '';
        }

    }
}