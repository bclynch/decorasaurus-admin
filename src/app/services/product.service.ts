import { Injectable } from '@angular/core';
import { APIService } from './api.service';

@Injectable()
export class ProductService {

  constructor(
    private apiService: APIService,
  ) {

  }

  getProductBySku(productSku: string) {
    return this.apiService.getProductBySku(productSku);
  }

  getAllProducts() {
    return this.apiService.getAllProducts();
  }
}
