import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReviewTestabilityComponent } from './pages/review-testability/review-testability.component';

const routes: Routes = [
  {
    path: 'performance-lab/review-testability',
    component: ReviewTestabilityComponent
  }
];

@NgModule({
  declarations: [
    ReviewTestabilityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PerformanceLabModule { }