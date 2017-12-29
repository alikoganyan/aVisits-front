import {UniqueEntity} from "../entity-collection/unique-entity";

export class EmployeePosition implements UniqueEntity {
    id: number;
    title: string;
    description: string;

    chain_id: number;

    constructor(obj?: any) {
        if(obj) {
            this.id = obj.id || 0;
            this.title = obj.title || '';
            this.description = obj.description || '';

            this.chain_id = obj.chain_id || null;
        }
    }
}