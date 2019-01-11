import { Injectable } from '@angular/core';
import { ProductBySkuGQL, AllProductsGQL } from '../generated/graphql';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {

  constructor(
    private productBySkuGQL: ProductBySkuGQL,
    private allProductsGQL: AllProductsGQL
  ) {

  }

  getProductBySku(productSku: string) {
    return this.productBySkuGQL.watch({ productSku })
      .valueChanges
      .pipe(
        map(result => result.data.productBySku)
      );
  }

  getAllProducts() {
    return this.allProductsGQL.watch()
      .valueChanges
      .pipe(
        map(result => result.data.allProducts.nodes)
      );
  }
}
