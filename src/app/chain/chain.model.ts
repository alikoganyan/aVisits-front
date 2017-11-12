import { ChainPriceLevel } from "./chain-price-level.model";
import {Salon} from "../salon/salon.model";

export class Chain {
    title: string;
    phone: string;
    description: string;
    levels: ChainPriceLevel[];
    salons: Salon[];

    constructor(obj?: any) {
        this.title = obj && obj.title || "";
        this.phone = obj && obj.phone || "";
        this.description = obj && obj.description || "";
        this.levels = obj && obj.levels || [];
        this.salons = obj && obj.salons || [];
    }
}
