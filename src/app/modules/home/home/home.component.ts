import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  unprocessedFusion: number;

  fusionSubscription: SubscriptionLike;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fusionSubscription = this.orderService.getUnprocessedFusion().valueChanges.subscribe(
      ({ data }) => {
        this.unprocessedFusion = data.allOrderItems.nodes.length;
      }
    );
  }

  ngOnDestroy() {
    this.fusionSubscription.unsubscribe();
  }
}
