import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent  {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products$ = this.productService.product$.pipe(
    catchError(err => {
    this.errorMessage = err;
      return of([]);
    })
  );

  constructor(private productService: ProductService) { }


  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
