import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';
import { ProductCategoryService } from '../product-categories/product-category.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';

  selectedCategoryId = 1;

  products$ = this.productService.productWithCategory$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return of([]);
    })
  );

  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return of([]);
    })
  );


  constructor(private productService: ProductService,
    private productCategoryService: ProductCategoryService) { }


  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
