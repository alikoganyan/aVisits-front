import {UniqueEntity} from "../entity-collection/unique-entity";

export class ServiceCategoryModel implements UniqueEntity {
    id: number;
    title: string;
    parent_id: number;

    constructor(obj?: any) {
        if(obj) {
            this.id = obj.id || null;
            this.title = obj.title || null;
            this.parent_id = obj.parent_id || null;
        }
    }
}