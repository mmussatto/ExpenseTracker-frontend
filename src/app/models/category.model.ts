import { Transaction } from "./transaction.model";

export interface Category {
    id?: number;
    name: string;
    color: string;
    transactions?: Transaction[];
}
