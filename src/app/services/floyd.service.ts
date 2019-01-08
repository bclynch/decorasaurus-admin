import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloydService {

  jobName: string;
  endpoint: string;
  fusionIsActive = false;

  public serverActionIsLoading: Observable<boolean>;
  public serverActionIsLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private apiService: APIService
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
}
