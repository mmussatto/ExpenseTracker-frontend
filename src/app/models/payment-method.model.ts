export interface PaymentMethod {
    id?: number;
    name: string;
    type: "DEBIT_CARD" | "CREDIT_CARD" | "PIX" | "CASH";
}
