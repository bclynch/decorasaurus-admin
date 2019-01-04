import { Injectable } from '@angular/core';
import { APIService } from './api.service';

@Injectable()
export class CustomerService {

  constructor(
    private apiService: APIService,
  ) {

  }

  getCustomerById(customerId: string) {
    return this.apiService.getCustomerById(customerId);
  }

  getAllCustomers() {
    return this.apiService.getAllCustomers();
  }
}
