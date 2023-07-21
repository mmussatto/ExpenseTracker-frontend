export interface Vendor {
    id?: number;
    name: string;
    address?: string;
    url?: string;
    type: "Physical Store" | "Online Store";
}
