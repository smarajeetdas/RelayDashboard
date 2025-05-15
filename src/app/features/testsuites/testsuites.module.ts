import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

// Import components
import { TestSuiteListComponent } from './pages/testsuite-list/testsuite-list.component';
import { TestSuiteDetailComponent } from './pages/testsuite-detail/testsuite-detail.component';
import { TestSuiteResultComponent } from './pages/testsuite-result/testsuite-result.component';

const routes: Routes = [
  { path: '', component: TestSuiteListComponent },
  { path: ':id', component: TestSuiteDetailComponent },
  { path: ':id/results/:resultId', component: TestSuiteResultComponent }
];

@NgModule({
  declarations: [
    TestSuiteListComponent,
    TestSuiteDetailComponent,
    TestSuiteResultComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TestSuitesModule { }