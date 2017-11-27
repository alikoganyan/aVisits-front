import {Chain} from "../../chain/chain.model";

export class Credentials {
    login: string;
    remember: boolean;
}

export class RegisterInfo {
    companyName: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
}

export class UserChain {
    id: number;
    title: string;
}

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