import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CurrentAdminGQL, RegisterAdminAccountGQL, AuthenticateAdminAccountGQL } from '../generated/graphql';
import { map } from 'rxjs/operators';

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
    private cookieService: CookieService,
    public snackBar: MatSnackBar,
    private router: Router,
    private apollo: Apollo,
    private currentAdminGQL: CurrentAdminGQL,
    private registerAdminAccountGQL: RegisterAdminAccountGQL,
    private authenticateAdminAccountGQL: AuthenticateAdminAccountGQL
  ) {
    this.adminToken = new BehaviorSubject<string>(null);
  }

  fetchUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.currentAdminGQL.fetch()
        .pipe(
          map(result => {
            const currentAdmin = result.data.currentAdmin;

            // if logged in set our admin id and set the token
            if (currentAdmin) {
              this.adminObject = currentAdmin;
              console.log(this.adminObject);
              const cookieToken = this.cookieService.get('decorasaurus-token');
              if (cookieToken) this.adminToken.next(cookieToken);
            } else {
              // if it doesnt exist dump the token
              // this.cookieService.delete('decorasaurus-token');
            }
            resolve();
          })
        );
    });
  }

  createAdmin(email: string, password: string): void {
    this.registerAdminAccountGQL.mutate({
      email,
      password
    })
    .subscribe(
      () => this.loginAdmin(email, password)
    );
  }

  loginAdmin(email: string, password: string) {
      this.authenticateAdminAccountGQL.mutate({
        email,
        password
      })
      .subscribe(
        (result) => {
          const token = result.data.authenticateAdminAccount.jwtToken;
          console.log(result);

          if (token) {
            // reset apollo cache and refetch queries
            this.apollo.getClient().resetStore();
            this.cookieService.set('decorasaurus-token', token);
            this.adminToken.next(token);

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
        }
      );
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
