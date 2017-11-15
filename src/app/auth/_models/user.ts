import {Chain} from "../../chain/chain.model";

export class User {
    id: number;
    email: string;
    phone: string;
    password: string;
    fullName: string;
    token: string;

    chain: any;
    chains: Chain[];
    selectedChain: any;
}