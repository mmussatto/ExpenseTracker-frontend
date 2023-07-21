import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Transaction, TransactionPage } from "src/app/models/transaction.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class TransactionsService {
    baseUrl: string = `${environment.baseUrl}/transactions`;

    constructor(private http: HttpClient) {}

    findAllTransactions(): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(this.baseUrl);
    }

    crateNewTransaction(transaction: Transaction): Observable<Transaction> {
        return this.http.post<Transaction>(this.baseUrl, transaction);
    }

    updateTransaction(id: number, transaction: Transaction): Observable<Transaction> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.put<Transaction>(url, transaction);
    }

    deleteTransaction(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url);
    }

    getTransactionTransactions(id: number): Observable<Transaction[]> {
        const url = `${this.baseUrl}/${id}/transactions?size=100`;
        return this.http
            .get<TransactionPage>(url)
            .pipe(map((transactionPage) => transactionPage.content));
    }
}
