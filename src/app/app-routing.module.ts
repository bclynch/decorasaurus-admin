import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService as RoleGuard } from './services/roleGuard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
   },
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule',
    canActivate: [RoleGuard],
    data: {
      expectedRole: ['decorasaurus_admin']
    }
  },
  {
    path: 'orders',
    loadChildren: './modules/orders/orders.module#OrdersModule',
    canActivate: [RoleGuard],
    data: {
      expectedRole: ['decorasaurus_admin']
    }
  },
  {
    path: 'customers',
    loadChildren: './modules/customers/customers.module#CustomersModule',
    canActivate: [RoleGuard],
    data: {
      expectedRole: ['decorasaurus_admin']
    }
  },
  {
    path: 'products',
    loadChildren: './modules/products/products.module#ProductsModule',
    canActivate: [RoleGuard],
    data: {
      expectedRole: ['decorasaurus_admin']
    }
  },
  {
    path: 'fusion',
    loadChildren: './modules/fusion/fusion.module#FusionModule',
    canActivate: [RoleGuard],
    data: {
      expectedRole: ['decorasaurus_admin']
    }
  },
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
  { path: '**', loadChildren: './modules/not-found/not-found.module#NotFoundModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
