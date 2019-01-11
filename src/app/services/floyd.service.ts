import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Fusion } from '../types/fusion.type';
import { OrderService } from './order.service';
import { UpdateOrderItemByIdGQL } from '../generated/graphql';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FloydService {

  jobName: string;
  endpoint: string;
  fusionIsActive = false;
  fusionProcessing = false;

  public serverActionIsLoading: Observable<boolean>;
  public serverActionIsLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private apiService: APIService,
    private orderService: OrderService,
    private updateOrderItemByIdGQL: UpdateOrderItemByIdGQL
  ) {
    this.serverActionIsLoadingSubject = new BehaviorSubject<boolean>(false);
  }

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.checkFusionServerActive().subscribe(
        (result) => {
          this.fusionIsActive = result.isActive;
          this.serverActionIsLoadingSubject = new BehaviorSubject<boolean>(false);
          this.serverActionIsLoading = this.serverActionIsLoadingSubject;
          this.jobName = result.jobName;
          this.endpoint = result.endpoint;
          resolve();
        }
      );
    });
  }

  modifyServer(isActive: boolean) {
    this.serverActionIsLoadingSubject.next(true);
    if (isActive) {
      this.apiService.turnOffFusionServer().subscribe(
        (result) => {
          console.log(result);
          this.jobName = '';
          this.endpoint = '';
          this.fusionIsActive = false;
          this.serverActionIsLoadingSubject.next(false);
        }
      );
    } else {
      this.apiService.turnOnFusionServer().subscribe(
        (result) => {
          console.log(result);
          this.jobName = result.jobName;
          this.endpoint = result.endpoint;
          this.fusionIsActive = true;
          this.serverActionIsLoadingSubject.next(false);
        }
      );
    }
  }

  processFusion(fusion: Fusion) {
    // if (!this.fusionProcessing && this.fusionIsActive) {
      this.fusionProcessing = true;

      this.apiService.processFusion(fusion).subscribe(
        (result) => {
          if (result.err) console.log(result.err);
          if (result.pdf) {
            // might refetch our fusion items or at least manually remove this one so list reflects reality of unprocessed fusions
            console.log(result.pdf);
            this.fusionProcessing = false;
            // this.apiService.updateOrderItem(fusion.id).subscribe(
            //   () => {
            //     this.orderService.getUnprocessedFusion().valueChanges.subscribe(
            //       ({ data }) => {
            //         console.log(data);
            //       }
            //     );
            //   }
            // );

            this.updateOrderItemByIdGQL.mutate({ id: fusion.id })
              .subscribe(
                () => {
                  // might refetch our fusion items or at least manually remove this one so list reflects reality of unprocessed fusions
                }
              );
          }
        }
      );
    // }
  }
}
