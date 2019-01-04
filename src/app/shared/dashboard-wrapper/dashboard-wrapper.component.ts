import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
  styleUrls: ['./dashboard-wrapper.component.scss']
})
export class DashboardWrapperComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  navOptions = [
    { label: 'Home', value: 'home', icon: 'home' },
    { label: 'Products', value: 'products', icon: 'burst_mode' },
    { label: 'Customers', value: 'customers', icon: 'supervisor_account' },
    { label: 'Orders', value: 'orders', icon: 'receipt' }
  ];

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private adminService: AdminService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
