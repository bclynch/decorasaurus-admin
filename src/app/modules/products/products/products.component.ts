import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { SubscriptionLike } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  // product props
  products;
  displayedColumns: string[] = ['status', 'sku', 'name', 'slug'];
  dataSource;
  pageSizeOptions = [25, 50, 100];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  productsSubscription: SubscriptionLike;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productsSubscription = this.productService.getAllProducts().valueChanges.subscribe(
      ({ data }) => {
        this.products = data.allProducts.nodes.map((product) => ({ status: product.status, sku: product.sku, name: product.name, slug: product.slug }) );
        this.dataSource = new MatTableDataSource(this.products);
        console.log(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
