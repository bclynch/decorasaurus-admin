import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { FloydService } from 'src/app/services/floyd.service';

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
    { label: 'Orders', value: 'orders', icon: 'receipt' },
    { label: 'Fusion', value: 'fusion', icon: 'call_merge' }
  ];

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private adminService: AdminService,
    private floydService: FloydService
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
