import { ProductsDataTransferService } from './../../../../shared/services/products/products-data-transfer/products-data-transfer.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { CategoriesService } from './../../../../services/categories/categories.service';
import { CreateProductRequest } from 'src/app/models/interfaces/products/request/CreateProductRequest';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/GetCategoriesResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: [],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  addProductForm = this.formBuilder.group({
    amount: [0, Validators.required],
    category_id: ['', Validators.required],
    description: ['', Validators.required],
    name: ['', Validators.required],
    price: ['', Validators.required],
  });

  categoriesData: GetCategoriesResponse[] = [];
  editProductForm = this.formBuilder.group({
    amount: [0, Validators.required],
    description: ['', Validators.required],
    name: ['', Validators.required],
    price: ['', Validators.required],
  });

  productAction!: {
    event: EventAction;
    productData: GetAllProductsResponse[];
  };

  productSelectedData!: GetAllProductsResponse;
  productsData!: GetAllProductsResponse[];
  selectedCategory: { name: string; code: string }[] = [];

  private readonly destroy$: Subject<void> = new Subject();

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private productsDataTransferService: ProductsDataTransferService,
    private productsService: ProductsService,
    private router: Router,
    public ref: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.productAction = this.ref.data;
    this.getAllCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAllCategories(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.categoriesData = response;
          }
        },
      });
  }

  handleSubmitAddProduct(): void {
    if (this.addProductForm?.value && this.addProductForm?.valid) {
      const requestCreateProduct: CreateProductRequest = {
        amount: Number(this.addProductForm.value.amount),
        category_id: this.addProductForm.value.category_id as string,
        description: this.addProductForm.value.description as string,
        name: this.addProductForm.value.name as string,
        price: this.addProductForm.value.price as string,
      };

      this.productsService
        .createProduct(requestCreateProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Produto criado com sucesso!',
                life: 2500,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criar produto!',
              life: 2500,
            });
            console.error(err);
          },
        });

      this.addProductForm.reset();
    }
  }

  handleSubmitEditProduct(): void {
    if (this.editProductForm?.value && this.editProductForm?.valid) {
    }
  }

  getProductSelectedData(productId: string): void {
    const allProducts = this.productAction?.productData;

    if (allProducts.length > 0) {
      const productFiltered = allProducts.filter(
        (element) => element?.id === productId
      );

      if (productFiltered) {
        this.productSelectedData = productFiltered[0];

        this.editProductForm.setValue({
          amount: this.productSelectedData?.amount,
          description: this.productSelectedData?.description,
          name: this.productSelectedData?.name,
          price: this.productSelectedData?.price,
        });
      }
    }
  }

  getProductData(): void {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsData = response;
            this.productsData &&
              this.productsDataTransferService.setProductsData(
                this.productsData
              );
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
