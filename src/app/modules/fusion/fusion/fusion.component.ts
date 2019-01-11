import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { SubscriptionLike } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';
import { UtilService } from 'src/app/services/util.service';
import { FloydService } from 'src/app/services/floyd.service';

@Component({
  selector: 'app-fusion',
  templateUrl: './fusion.component.html',
  styleUrls: ['./fusion.component.scss']
})
export class FusionComponent implements OnInit {

  // fusion props
  fusions;
  displayedColumns: string[] = ['id', 'type', 'orientation', 'size', 'process'];
  dataSource;
  pageSizeOptions = [25, 50, 100];
  loadingServer = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  loadingServerSubscription: SubscriptionLike;
  settingsSubscription: SubscriptionLike;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private utilService: UtilService,
    private floydService: FloydService,
    private settingsService: SettingsService
  ) {
    this.settingsSubscription = this.settingsService.appInited.subscribe((inited) =>  { if (inited) this.init(); });
  }

  ngOnInit() {
  }

  init() {
    this.orderService.getUnprocessedFusion().subscribe(
      (fusions) => {
        this.fusions = fusions.map((fusion) => ({ id: fusion.id, orderId: fusion.orderId, type: fusion.fusionType, orientation: fusion.orientation, size: fusion.size, cropUrl: fusion.productLinksByOrderItemId.nodes[0].url }) );
        this.dataSource = new MatTableDataSource(this.fusions);
        console.log(this.fusions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
    this.loadingServerSubscription = this.floydService.serverActionIsLoading.subscribe(
      loading => this.loadingServer = loading
    );
  }

}
