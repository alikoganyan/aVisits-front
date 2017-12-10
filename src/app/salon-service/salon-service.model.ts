import {UniqueEntity} from "../entity-collection/unique-entity";

export class SalonServiceModel implements UniqueEntity {
    id: number;
    title: string;
    description: string;
    service_category_id: number;
    chain_id: number;
    duration: string;
    price: any;

    available_for_online_recording: boolean;
    only_for_online_recording: boolean;


    constructor(obj?: any) {
        obj = obj || {};

        this.chain_id = obj.chain_id || null;
        this.id = obj.id || null;
        this.title = obj.title || '';
        this.description = obj.description || 'description';
        this.service_category_id = obj.service_category_id || '';
        this.duration = obj.duration || '';
        this.price = obj.price || '';
        this.available_for_online_recording = obj.available_for_online_recording || false;
        this.only_for_online_recording = obj.only_for_online_recording || false;
    }
}