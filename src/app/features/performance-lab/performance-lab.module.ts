import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReviewTestabilityComponent } from './pages/review-testability/review-testability.component';
import { TestResultsComponent } from './pages/test-results/test-results.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: '', redirectTo: 'review-testability', pathMatch: 'full' },
      { path: 'review-testability', component: ReviewTestabilityComponent },
      { path: 'test-results', component: TestResultsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ReviewTestabilityComponent,
    TestResultsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PerformanceLabModule { }