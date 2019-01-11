import { Component, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductBySku } from 'src/app/generated/graphql';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: ProductBySku.ProductBySku;

  paramsSubscription: SubscriptionLike;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.route.params.subscribe((params) => {
      this.productService.getProductBySku(params.productSku).subscribe(
        (product) => {
          this.product = product;
          console.log(this.product);
        }
      );
    });
  }

  ngOnInit() {
  }

}
