import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "src/app/models/category.model";
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
        console.log(category);

        return this.http.post<Category>(this.baseUrl, category);
    }

    updateCategory(category: Category): Observable<Category> {
        console.log(category);

        return this.http.put<Category>(`${this.baseUrl}/${category.id}`, category);
    }

    deleteCategory(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url);
    }
}
