import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestCasesRoutingModule } from './testcases-routing.module';
import { TestCaseListComponent } from './pages/testcase-list/testcase-list.component';
import { TestCaseDetailComponent } from './pages/testcase-detail/testcase-detail.component';

@NgModule({
  declarations: [
    TestCaseListComponent,
    TestCaseDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TestCasesRoutingModule
  ]
})
export class TestCasesModule { }