import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Transaction, TransactionPage } from "src/app/models/transaction.model";
import { Tag } from "src/app/models/tag.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class TagsService {
    baseUrl: string = `${environment.baseUrl}/tags`;

    constructor(private http: HttpClient) {}

    findAllTags(): Observable<Tag[]> {
        return this.http.get<Tag[]>(this.baseUrl);
    }

    crateNewTag(tag: Tag): Observable<Tag> {
        return this.http.post<Tag>(this.baseUrl, tag);
    }

    updateTag(id: number, tag: Tag): Observable<Tag> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.put<Tag>(url, tag);
    }

    deleteTag(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url);
    }

    getTagTransactions(id: number): Observable<Transaction[]> {
        const url = `${this.baseUrl}/${id}/transactions?size=100`;
        return this.http
            .get<TransactionPage>(url)
            .pipe(map((transactionPage) => transactionPage.content));
    }
}
