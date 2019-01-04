import { Injectable } from '@angular/core';
import { SubscriptionLike, Observable, BehaviorSubject } from 'rxjs';
import { APIService } from './api.service';
import { v4 as uuid } from 'uuid';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminUuid: string;
  adminObject: {
    id: string;
    email: string;
  };

  public adminToken: BehaviorSubject<string>;

  constructor(
    private apiService: APIService,
    private cookieService: CookieService,
    public snackBar: MatSnackBar,
    private router: Router,
    private apollo: Apollo
  ) {
    this.adminToken = new BehaviorSubject<string>(null);
  }

  fetchUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getCurrentAdmin().valueChanges.subscribe(({ data }) => {
        console.log(data);

        // if logged in set our admin id and set the token
        if (data.currentAdmin) {
          this.adminObject = data.currentAdmin;
          console.log(this.adminObject);
          const cookieToken = this.cookieService.get('decorasaurus-token');
          if (cookieToken) this.adminToken.next(cookieToken);
        } else {
          // if it doesnt exist dump the token
          // this.cookieService.delete('decorasaurus-token');
        }
        resolve();
      });
    });
  }

  createAdmin(email: string, password: string): void {
    this.apiService.registerAdmin(email, password).subscribe(
      () =>  {
        this.loginAdmin(email, password);
      },
      err => console.log(err)
    );
  }

  loginAdmin(email: string, password: string) {
      this.apiService.authAdmin(email, password).subscribe(({data}) => {
        console.log(data);
        if (data.authenticateAdminAccount.jwtToken) {
          // reset apollo cache and refetch queries
          this.apollo.getClient().resetStore();
          this.cookieService.set('decorasaurus-token', data.authenticateAdminAccount.jwtToken);
          this.adminToken.next(data.authenticateAdminAccount.jwtToken);

          this.router.navigateByUrl('/');
          window.location.reload();
        } else {
          // incorrect login warning
          // this.snackBar.openFromComponent(CustomerStateSnackbar, {
          //   duration: 3000,
          //   verticalPosition: 'top',
          //   data: { message: `Incorrect login credentials, try again.` },
          //   panelClass: ['snackbar-theme']
          // });
        }
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  logoutAdmin() {
    this.cookieService.delete('decorasaurus-token');
    this.adminToken.next(null);
    this.adminObject = null;

    // reset apollo cache and refetch queries
    this.apollo.getClient().resetStore();

    this.router.navigateByUrl('/login');
    // this.snackBar.openFromComponent(CustomerStateSnackbar, {
    //   duration: 3000,
    //   verticalPosition: 'top',
    //   data: { message: 'Successfully logged out' },
    //   panelClass: ['snackbar-theme']
    // });
  }
}
