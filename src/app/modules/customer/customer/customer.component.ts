import { Component, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerById } from 'src/app/generated/graphql';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customer: CustomerById.CustomerById;

  paramsSubscription: SubscriptionLike;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
  ) {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.customerService.getCustomerById(params.customerId).subscribe(
        (customer) => {
          this.customer = customer;
          console.log(this.customer);
        }
      );
    });
  }

  ngOnInit() {
  }

}
