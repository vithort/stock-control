import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { DeleteProductAction } from 'src/app/models/interfaces/products/event/DeleteProductAction';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
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
  private ref!: DynamicDialogRef;

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
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
      this.ref = this.dialogService.open(ProductFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 1000,
        maximizable: true,
        data: {
          event: event,
          productsData: this.productsData,
        },
      });

      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAPIProductsData(),
      });
    }
  }

  handleDeleteProductAction(event: DeleteProductAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do produto: ${event?.productName}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteProduct(event?.product_id),
      });
    }
  }

  deleteProduct(product_id: string): void {
    if (product_id) {
      this.productsService
        .deleteProduct(product_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Produto removido com sucesso!',
                life: 2500,
              });

              this.getAPIProductsData();
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao remover produto!',
              life: 2500,
            });
            console.error(err);
          },
        });
    }
  }
}
