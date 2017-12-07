import { ChainPriceLevel } from "./chain-price-level.model";
import { Salon } from "../salon/salon.model";
import {UniqueEntity} from "../entity-collection/unique-entity";

export class Chain implements UniqueEntity {
    id: number;
    title: string;
    img: string;
    phone_number: string;
    levels: ChainPriceLevel[];
    salons: Salon[];
    salonsCount: number;

    constructor(obj?: any) {
        this.id = obj && obj.id || 0;
        this.title = obj && obj.title || "";
        this.img = obj && obj.img || "";
        this.phone_number = obj && obj.phone_number || "";
        this.levels = obj && obj.levels || [new ChainPriceLevel('Цена')];
        this.salons = obj && obj.salons || [];
        this.salonsCount = obj && obj.salonsCount || 0;
    }
}
