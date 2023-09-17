import { Component, Input } from '@angular/core';

import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/GetCategoriesResponse';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: [],
})
export class CategoriesTableComponent {
  @Input() categories: GetCategoriesResponse[] = [];

  categorySelected!: GetCategoriesResponse;
}
