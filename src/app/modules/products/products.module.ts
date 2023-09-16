import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { PRODUCTS_ROUTES } from './products.routing';
import { ProductsHomeComponent } from './page/products-home/products-home.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProductsHomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(PRODUCTS_ROUTES),
    SharedModule,
    // PrimeNg
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DropdownModule,
    DynamicDialogModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    TableModule,
    TooltipModule,
  ],
  providers: [ConfirmationService, DialogService],
})
export class ProductsModule {}
