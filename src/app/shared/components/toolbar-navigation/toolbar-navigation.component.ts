import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService } from 'primeng/dynamicdialog';

import { CookieService } from 'ngx-cookie-service';

import { ProductEvent } from 'src/app/models/enums/products/ProductEvent';
import { ProductFormComponent } from 'src/app/modules/products/components/product-form/product-form.component';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: [],
})
export class ToolbarNavigationComponent {
  saleProductAction = ProductEvent.SALE_PRODUCT_EVENT;

  constructor(
    private cookieService: CookieService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  handleLogout(): void {
    this.cookieService.delete('USER_INFO');
    void this.router.navigate(['/home']);
  }

  handleSaleProduct(): void {
    this.dialogService.open(ProductFormComponent, {
      header: this.saleProductAction,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        event: { action: this.saleProductAction },
      },
    });
  }
}
