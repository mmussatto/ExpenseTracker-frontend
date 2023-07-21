import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { PaymentMethod } from "src/app/models/payment-method.model";
import { Transaction, TransactionPage } from "src/app/models/transaction.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class PaymentMethodService {
    baseUrl: string = `${environment.baseUrl}/payment-methods`;

    constructor(private http: HttpClient) {}

    findAllPaymentMethods(): Observable<PaymentMethod[]> {
        return this.http.get<PaymentMethod[]>(this.baseUrl);
    }

    crateNewPaymentMethod(paymentMethod: PaymentMethod): Observable<PaymentMethod> {
        return this.http.post<PaymentMethod>(this.baseUrl, paymentMethod);
    }

    updatePaymentMethod(id: number, paymentMethod: PaymentMethod): Observable<PaymentMethod> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.put<PaymentMethod>(url, paymentMethod);
    }

    deletePaymentMethod(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url);
    }

    getPaymentMethodTransactions(id: number): Observable<Transaction[]> {
        const url = `${this.baseUrl}/${id}/transactions?size=100`;
        return this.http
            .get<TransactionPage>(url)
            .pipe(map((transactionPage) => transactionPage.content));
    }
}
