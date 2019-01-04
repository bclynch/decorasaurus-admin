import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ENV } from '../../environments/environment';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';

// mutations
import {
  registerAdminAccountMutation,
  authAdminAccountMutation
} from '../api/mutations/admin.mutation';

import { currentAdminQuery } from '../api/queries/admin.query';
import { allOrdersQuery, orderByIdQuery } from '../api/queries/order.query';
import { allCustomersQuery, customerByIdQuery } from '../api/queries/customer.query';
import { allProductsQuery, productBySkuQuery } from '../api/queries/product.query';

@Injectable()
export class APIService {

  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private apollo: Apollo
  ) {}

  // *******************************************************************
  // ************************* Queries *********************************
  // *******************************************************************

  getCurrentAdmin(): any {
    return this.apollo.watchQuery<any>({
      query: currentAdminQuery
    });
  }
  getAllOrders(): any {
    return this.apollo.watchQuery<any>({
      query: allOrdersQuery
    });
  }
  getOrderById(orderId: string): any {
    return this.apollo.watchQuery<any>({
      query: orderByIdQuery,
      variables: {
        orderId
      }
    });
  }
  getAllCustomers(): any {
    return this.apollo.watchQuery<any>({
      query: allCustomersQuery
    });
  }
  getCustomerById(customerId: string): any {
    return this.apollo.watchQuery<any>({
      query: customerByIdQuery,
      variables: {
        customerId
      }
    });
  }
  getAllProducts(): any {
    return this.apollo.watchQuery<any>({
      query: allProductsQuery
    });
  }
  getProductBySku(productSku: string): any {
    return this.apollo.watchQuery<any>({
      query: productBySkuQuery,
      variables: {
        productSku
      }
    });
  }

  // *******************************************************************
  // ************************* Mutations *********************************
  // *******************************************************************

  // Create Admin
  registerAdmin(email: string, password: string) {
    return this.apollo.mutate({
      mutation: registerAdminAccountMutation,
      variables: {
        email,
        password
      }
    });
  }

  // Auth Admin
  authAdmin(email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: authAdminAccountMutation,
      variables: {
        email,
        password
      }
    });
  }

  // shippo
  createShippingLabel(addressFrom, addressTo, parcels) {
    return this.http.post(`${ENV.apiBaseURL}/shippo/create-label`, { addressFrom, addressTo, parcels })
    .pipe(map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
    ).pipe(catchError(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
    ));
  }

  validateAddress(address) {
    return this.http.post(`${ENV.apiBaseURL}/shippo/validate-address`, { address })
    .pipe(map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
    ).pipe(catchError(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
    ));
  }

  createRefund(transactionId: string) {
    return this.http.post(`${ENV.apiBaseURL}/shippo/create-refund-label`, { transactionId })
    .pipe(map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
    ).pipe(catchError(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
    ));
  }

  trackPackage(trackingNumber: string, carrier: string) {
    return this.http.post(`${ENV.apiBaseURL}/shippo/track`, { trackingNumber, carrier })
    .pipe(map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
    ).pipe(catchError(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
    ));
  }
}
