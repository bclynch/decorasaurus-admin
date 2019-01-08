import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatInputModule,
  MatIconModule,
  MatSnackBarModule,
  MatSelectModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatMenuModule,
  MatTooltipModule
} from '@angular/material';
import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';

@NgModule({
  declarations: [DashboardWrapperComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    DashboardWrapperComponent,
    MatPaginatorModule,
    MatMenuModule,
    MatTooltipModule
  ]
})
export class SharedModule { }
