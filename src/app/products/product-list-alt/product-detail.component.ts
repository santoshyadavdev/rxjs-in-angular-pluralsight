import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ProductService } from '../product.service';
import { of, Subject, EMPTY, combineLatest } from 'rxjs';
import { Product } from '../product';
import { catchError, map, filter } from 'rxjs/operators';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();


  product$ = this.productService.selectedproduct$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  pageTitle$ = this.product$.pipe(
    map((p: Product) => p ? `Product Detail for: ${p.productName}` : null)
  );

  productSuppliers$ = this.productService.selectedProductSuppliers$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  vm$ = combineLatest([
    this.product$,
    this.productSuppliers$,
    this.pageTitle$
  ]).pipe(
    filter(([product]) => Boolean(product)),
    map(([product, productSuppliers, pageTitle]) => ({ product, productSuppliers, pageTitle }))
  );

  constructor(private productService: ProductService) { }

}
