import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReviewTestabilityComponent } from './review-testability/review-testability.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: '', redirectTo: 'review-testability', pathMatch: 'full' },
      { path: 'review-testability', component: ReviewTestabilityComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ReviewTestabilityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PerformanceLabModule { }