import { Category } from "./category.model";
import { PaymentMethod } from "./payment-method.model";
import { Tag } from "./tag.model";
import { Vendor } from "./vendor.model";

export interface Transaction {
    id?: number;
    amount: number;
    date: string;
    description: string;
    category: Category;
    paymentMethod: PaymentMethod;
    vendor: Vendor;
    tags: Tag[];
}

export interface TransactionPage {
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    nextPage: string | null;
    previousPage: string | null;
    content: Transaction[];
}
