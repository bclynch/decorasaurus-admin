import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ENV } from '../environments/environment';

// import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ApolloModule, Apollo } from 'apollo-angular';
// import { setContext } from 'apollo-link-context';
// Apollo
import { GraphQLModule } from './graphql.module';

import { CookieService } from 'ngx-cookie-service';
import { SettingsService } from './services/settings.service';
import { AdminService } from './services/admin.service';
import { APIService } from './services/api.service';
import { OrderService } from './services/order.service';
import { CustomerService } from './services/customer.service';
import { ProductService } from './services/product.service';
import { UtilService } from './services/util.service';
import { FloydService } from './services/floyd.service';
import { RoleGuardService } from './services/roleGuard.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // HttpLinkModule,
    // ApolloModule,
    HttpModule,
    SharedModule,
    BrowserAnimationsModule,
    GraphQLModule
  ],
  providers: [
    CookieService,
    SettingsService,
    AdminService,
    APIService,
    OrderService,
    RoleGuardService,
    CustomerService,
    ProductService,
    UtilService,
    FloydService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(
  //   apollo: Apollo,
  //   httpLink: HttpLink,
  //   private cookieService: CookieService
  // ) {
  //   const http = httpLink.create({ uri: ENV.apolloBaseURL });

  //   let link;
  //   const token = this.cookieService.get('decorasaurus-token');
  //   if (token && token !== 'null') {
  //     const middleware = setContext(() => ({
  //       headers: new HttpHeaders().set('Authorization', token ? `Bearer ${token}` : null)
  //     }));

  //     link = middleware.concat(http);
  //   } else {
  //     link = http;
  //   }

  //   apollo.create({
  //     link,
  //     cache: new InMemoryCache()
  //   });
  // }
}
