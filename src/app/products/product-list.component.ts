import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';
import { ProductCategoryService } from '../product-categories/product-category.service';
import { of, Subject, combineLatest, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';

  private caregorySelectedSubject = new Subject<number>();
  categorySelectedAction$ = this.caregorySelectedSubject.asObservable();

  // selectedCategoryId = 1;

  // products$ =  this.productService.productWithCategory$.pipe(
  //   catchError(err => {
  //     this.errorMessage = err;
  //     return of([]);
  //   })
  // );

  products$ = combineLatest(
    [
      this.productService.productWithCategory$,
      this.categorySelectedAction$
    ]).pipe(
      map(([products, selectedCategoryId]) =>
        products.filter(product =>
          selectedCategoryId ? product.categoryId === selectedCategoryId : true
        )),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  // productsSimpleFilter$ = this.productService.productWithCategory$.pipe(
  //   map(products => products.filter(product =>
  //     this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true
  //   ))
  // );

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
    // this.selectedCategoryId = +categoryId;
  }
}
