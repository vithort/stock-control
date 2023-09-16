import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';

import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataTransferService {
  productsData: GetAllProductsResponse[] = [];
  productsDataEmmiter$ = new BehaviorSubject<GetAllProductsResponse[] | null>(
    null
  );

  setProductsData(products: GetAllProductsResponse[]): void {
    if (products) {
      this.productsDataEmmiter$.next(products);
      this.getProductsData();
    }
  }

  getProductsData(): GetAllProductsResponse[] {
    this.productsDataEmmiter$
      .pipe(
        take(1),
        map((data) => data?.filter((product) => product.amount > 0))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.productsData = response;
          }
        },
      });

    return this.productsData;
  }
}
