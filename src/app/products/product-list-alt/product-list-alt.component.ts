import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.onpu
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  errorMessage = '';
 
  products$ = this.productService.productWithCategory$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return of([]);
    })
  );
  
  selectProduct$ = this.productService.selectedproduct$;

  constructor(private productService: ProductService) { }

  onSelected(productId: number): void {
    // console.log('Not yet implemented');
    this.productService.selectedProductChanged(productId);
  }
}
