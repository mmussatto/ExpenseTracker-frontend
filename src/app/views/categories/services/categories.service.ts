import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Category } from "src/app/models/category.model";
import { Transaction, TransactionPage } from "src/app/models/transaction.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class CategoriesService {
    baseUrl: string = `${environment.baseUrl}/categories`;

    constructor(private http: HttpClient) {}

    findAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl);
    }

    createNewCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.baseUrl, category);
    }

    updateCategory(id: number, category: Category): Observable<Category> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.put<Category>(url, category);
    }

    deleteCategory(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url);
    }

    getCategoryTransactions(id: number): Observable<Transaction[]> {
        const url = `${this.baseUrl}/${id}/transactions?size=100`;
        return this.http
            .get<TransactionPage>(url)
            .pipe(map((transactionPage) => transactionPage.content));
    }
}
