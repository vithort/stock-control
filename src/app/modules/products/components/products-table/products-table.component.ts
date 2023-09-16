import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductEvent } from 'src/app/models/interfaces/enums/products/ProductEvent';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: [],
})
export class ProductsTableComponent {
  @Input() products!: GetAllProductsResponse[];
  @Output() productEvent = new EventEmitter<EventAction>();

  addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT;
  productSelected!: GetAllProductsResponse;

  handleProductEvent(action: string, id?: string): void {
    if (action && action !== '') {
      const productEventData = id && id !== '' ? { action, id } : { action };
      this.productEvent.emit(productEventData);
    }
  }
}
