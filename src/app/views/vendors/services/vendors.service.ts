import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Transaction, TransactionPage } from "src/app/models/transaction.model";
import { Vendor } from "src/app/models/vendor.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class VendorsService {
    baseUrl: string = `${environment.baseUrl}/vendors`;

    constructor(private http: HttpClient) {}

    findAllVendors(): Observable<Vendor[]> {
        return this.http.get<Vendor[]>(this.baseUrl);
    }

    crateNewVendor(vendor: Vendor): Observable<Vendor> {
        return this.http.post<Vendor>(this.baseUrl, vendor);
    }

    updateVendor(id: number, vendor: Vendor): Observable<Vendor> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.put<Vendor>(url, vendor);
    }

    deleteVendor(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url);
    }

    getVendorTransactions(id: number): Observable<Transaction[]> {
        const url = `${this.baseUrl}/${id}/transactions?size=100`;
        return this.http
            .get<TransactionPage>(url)
            .pipe(map((transactionPage) => transactionPage.content));
    }
}
