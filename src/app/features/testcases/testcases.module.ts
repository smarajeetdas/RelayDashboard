import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

// Import components as they are created
import { TestCaseListComponent } from './pages/testcase-list/testcase-list.component';
import { TestCaseDetailComponent } from './pages/testcase-detail/testcase-detail.component';
import { TestSimpleComponent } from './pages/test-simple/test-simple.component';
import { TestcaseResultComponent } from './pages/testcase-result/testcase-result.component';

const routes: Routes = [
  { path: '', component: TestCaseListComponent },
  { path: 'simple', component: TestSimpleComponent },
  { path: ':id', component: TestCaseDetailComponent },
  { path: ':id/results/:resultId', component: TestcaseResultComponent }
];

@NgModule({
  declarations: [
    TestCaseListComponent,
    TestCaseDetailComponent,
    TestSimpleComponent,
    TestcaseResultComponent
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
export class TestCasesModule { }