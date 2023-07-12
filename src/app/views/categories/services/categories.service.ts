import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export interface Category {
    id: number;
    name: string;
    color: string;
}

@Injectable({
    providedIn: "root",
})
export class CategoriesService {
    baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {}

    findAllCategories(): Observable<Category[]> {
        const url = `${this.baseUrl}/categories`;
        return this.http.get<Category[]>(url);
    }
}
