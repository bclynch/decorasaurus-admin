import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { CustomerByIdGQL, AllCustomersGQL } from '../generated/graphql';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomerService {

  constructor(
    private customerByIdGQL: CustomerByIdGQL,
    private allCustomersGQL: AllCustomersGQL
  ) {

  }

  getCustomerById(customerId: string) {
    return this.customerByIdGQL.watch({ customerId })
      .valueChanges
      .pipe(
        map(result => result.data.customerById)
      );
  }

  getAllCustomers() {
    return this.allCustomersGQL.watch()
      .valueChanges
      .pipe(
        map(result => result.data.allCustomers.nodes)
      );
  }
}
