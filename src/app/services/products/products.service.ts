import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { environment } from 'src/environments/environment';

import { CreateProductRequest } from 'src/app/models/interfaces/products/request/CreateProductRequest';
import { CreateProductResponse } from 'src/app/models/interfaces/products/response/CreateProductResponse';
import { DeleteProductResponse } from 'src/app/models/interfaces/products/response/DeleteProductResponse';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { EditProductRequest } from 'src/app/models/interfaces/products/request/EditProductRequest';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookieService.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllProducts(): Observable<GetAllProductsResponse[]> {
    return this.http
      .get<GetAllProductsResponse[]>(
        `${this.API_URL}/products`,
        this.httpOptions
      )
      .pipe(map((product) => product.filter((data) => data.amount > 0)));
  }

  deleteProduct(product_id: string): Observable<DeleteProductResponse> {
    return this.http.delete<DeleteProductResponse>(
      `${this.API_URL}/product/delete`,
      {
        ...this.httpOptions,
        params: {
          product_id: product_id,
        },
      }
    );
  }

  createProduct(
    requestData: CreateProductRequest
  ): Observable<CreateProductResponse> {
    return this.http.post<CreateProductResponse>(
      `${this.API_URL}/product`,
      requestData,
      this.httpOptions
    );
  }

  editProduct(requestData: EditProductRequest): Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/product/edit`,
      requestData,
      this.httpOptions
    );
  }
}
