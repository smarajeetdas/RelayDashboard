import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

// Import components as they are created
import { TestCaseListComponent } from './pages/testcase-list/testcase-list.component';
import { TestCaseDetailComponent } from './pages/testcase-detail/testcase-detail.component';

const routes: Routes = [
  { path: '', component: TestCaseListComponent },
  { path: ':id', component: TestCaseDetailComponent }
];

@NgModule({
  declarations: [
    TestCaseListComponent,
    TestCaseDetailComponent
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