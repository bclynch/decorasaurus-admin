import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ENV } from '../../environments/environment';

import { Fusion } from '../types/fusion.type';

@Injectable()
export class APIService {

  constructor(
    private http: Http
  ) {}

  // *******************************************************************
  // ************************* Fusion *********************************
  // *******************************************************************
  checkFusionServerActive() {
    return this.http.get(`${ENV.apiBaseURL}/floyd/is-active`)
    .pipe(map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
    ).pipe(catchError(
        (error: Response) => throwError(error)
    ));
  }

  turnOnFusionServer() {
    return this.http.get(`${ENV.apiBaseURL}/floyd/turn-on-server`)
    .pipe(map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
    ).pipe(catchError(
        (error: Response) => throwError(error)
    ));
  }

  turnOffFusionServer() {
    return this.http.get(`${ENV.apiBaseURL}/floyd/turn-off-server`)
    .pipe(map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
    ).pipe(catchError(
        (error: Response) => throwError(error)
    ));
  }

  processFusion(fusion: Fusion) {
    return this.http.post(`${ENV.apiBaseURL}/floyd/process-fusion`, { fusion })
    .pipe(map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
    ).pipe(catchError(
        (error: Response) => throwError(error)
    ));
  }

  // shippo
  createShippingLabel(addressFrom, addressTo, parcels) {
    return this.http.post(`${ENV.apiBaseURL}/shippo/create-label`, { addressFrom, addressTo, parcels })
    .pipe(map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
    ).pipe(catchError(
        (error: Response) => throwError(error)
    ));
  }

  validateAddress(address) {
    return this.http.post(`${ENV.apiBaseURL}/shippo/validate-address`, { address })
    .pipe(map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
    ).pipe(catchError(
        (error: Response) => {
          return throwError(error);
        }
    ));
  }

  createRefund(transactionId: string) {
    return this.http.post(`${ENV.apiBaseURL}/shippo/create-refund-label`, { transactionId })
    .pipe(map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
    ).pipe(catchError(
        (error: Response) => throwError(error)
    ));
  }

  trackPackage(trackingNumber: string, carrier: string) {
    return this.http.post(`${ENV.apiBaseURL}/shippo/track`, { trackingNumber, carrier })
    .pipe(map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
    ).pipe(catchError(
        (error: Response) => throwError(error)
    ));
  }
}
