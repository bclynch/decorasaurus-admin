import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FusionComponent } from './fusion/fusion.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: FusionComponent
  }
];

@NgModule({
  declarations: [FusionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class FusionModule { }
