import { Component, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product;

  paramsSubscription: SubscriptionLike;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.productService.getProductBySku(params.productSku).valueChanges.subscribe(
        ({ data }) => {
          this.product = data.productBySku;
          console.log(this.product);
        }
      );
    });
  }

  ngOnInit() {
  }

}
