import { ChainPriceLevel } from "./chain-price-level.model";
import { Salon } from "../salon/salon.model";

export class Chain {
    id: string;
    title: string;
    phone_number: string;
    description: string;
    levels: ChainPriceLevel[];
    salons: Salon[];
    salonsCount: number;

    constructor(obj?: any) {
        this.id = obj && obj.id || "";
        this.title = obj && obj.title || "";
        this.phone_number = obj && obj.phone_number || "";
        this.description = obj && obj.description || "";
        this.levels = obj && obj.levels || [];
        this.salons = obj && obj.salons || [];
        this.salonsCount = obj && obj.salonsCount || 0;
    }
}
