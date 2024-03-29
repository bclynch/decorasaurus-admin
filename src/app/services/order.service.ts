import { Injectable } from '@angular/core';
import { AllOrdersGQL, OrderByIdGQL, UnprocessedFusionGQL } from '../generated/graphql';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderService {

  constructor(
    private allOrdersGQL: AllOrdersGQL,
    private orderByIdGQL: OrderByIdGQL,
    private unprocessedFusionGQL: UnprocessedFusionGQL
  ) {

  }

  getOrderById(orderId: string) {
    return this.orderByIdGQL.watch({ orderId })
      .valueChanges
      .pipe(
        map(result => result.data.orderById)
      );
  }

  getAllOrders() {
    return this.allOrdersGQL.watch()
      .valueChanges
      .pipe(
        map(result => result.data.allOrders.nodes)
      );
  }

  getUnprocessedFusion() {
    return this.unprocessedFusionGQL.watch()
      .valueChanges
      .pipe(
        map(result => result.data.allOrderItems.nodes)
      );
  }
}
