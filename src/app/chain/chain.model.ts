import { ChainPriceLevel } from "./chain-price-level.model";

export class Chain {
    title: string;
    phone: string;
    description: string;
    levels: ChainPriceLevel[];

    constructor(obj?: any) {
        this.title = obj && obj.title || "";
        this.phone = obj && obj.phone || "";
        this.description = obj && obj.description || "";
        this.levels = obj && obj.levels || new ChainPriceLevel();
    }
}
