import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer/products-data-transfer.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: [],
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  productsData: GetAllProductsResponse[] = [];

  private readonly destroy$: Subject<void> = new Subject();

  constructor(
    private messageService: MessageService,
    private productsDataTransferService: ProductsDataTransferService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getServiceProductsData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getServiceProductsData(): void {
    const productsLoaded = this.productsDataTransferService.getProductsData();

    if (productsLoaded.length > 0) {
      this.productsData = productsLoaded;
    } else this.getAPIProductsData();
  }

  getAPIProductsData(): void {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsData = response;
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar produtos!',
            life: 2500,
          });
          console.error(err);
          this.router.navigate(['/dashboard']);
        },
      });
  }

  handleProductAction(event: EventAction): void {
    if (event) {
      console.log('DADOS DO EVENTO RECEBIDO', event);
    }
  }
}
