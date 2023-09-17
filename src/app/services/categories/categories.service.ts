import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { environment } from 'src/environments/environment';

import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/GetCategoriesResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookieService.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllCategories(): Observable<GetCategoriesResponse[]> {
    return this.http.get<GetCategoriesResponse[]>(
      `${this.API_URL}/categories`,
      this.httpOptions
    );
  }

  deleteCategory(requestData: { category_id: string }): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/category/delete`, {
      ...this.httpOptions,
      params: {
        category: requestData?.category_id,
      },
    });
  }
}
