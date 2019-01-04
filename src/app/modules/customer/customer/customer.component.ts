import { Component, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customer;

  paramsSubscription: SubscriptionLike;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
  ) {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.customerService.getCustomerById(params.customerId).valueChanges.subscribe(
        ({ data }) => {
          this.customer = data.customerById;
          console.log(this.customer);
        }
      );
    });
  }

  ngOnInit() {
  }

}
