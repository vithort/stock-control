import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CategoryEvent } from 'src/app/models/enums/categories/CategoryEvent';
import { DeleteCategoryAction } from 'src/app/models/interfaces/categories/event/DeleteCategoryAction';
import { EditCategoryAction } from 'src/app/models/interfaces/categories/event/EditCategoryAction';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/GetCategoriesResponse';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: [],
})
export class CategoriesTableComponent {
  @Input() categories: GetCategoriesResponse[] = [];
  @Output() categoryEvent = new EventEmitter<EditCategoryAction>();
  @Output() deleteCategoryEvent = new EventEmitter<DeleteCategoryAction>();

  addCategoryAction = CategoryEvent.ADD_CATEGORY_EVENT;
  categorySelected!: GetCategoriesResponse;
  editCategoryAction = CategoryEvent.EDIT_CATEGORY_EVENT;

  handleDeleteCategoryEvent(category_id: string, categoryName: string): void {
    if (category_id !== '' && categoryName !== '') {
      this.deleteCategoryEvent.emit({ category_id, categoryName });
    }
  }

  handleCategoryEvent(
    action: string,
    id?: string,
    categoryName?: string
  ): void {
    if (action && action !== '') {
      this.categoryEvent.emit({ action, id, categoryName });
    }
  }
}
