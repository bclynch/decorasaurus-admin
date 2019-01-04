import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SubscriptionLike } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {

  // customer props
  customers;
  displayedColumns: string[] = ['firstName', 'lastName', 'date'];
  dataSource;
  pageSizeOptions = [25, 50, 100];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  customersSubscription: SubscriptionLike;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.customersSubscription = this.customerService.getAllCustomers().valueChanges.subscribe(
      ({ data }) => {
        this.customers = data.allCustomers.nodes.map((customer) => ({ id: customer.id, firstName: customer.firstName, lastName: customer.lastName, date: customer.createdAt }) );
        this.dataSource = new MatTableDataSource(this.customers);
        console.log(this.customers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  ngOnDestroy() {
    this.customersSubscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
