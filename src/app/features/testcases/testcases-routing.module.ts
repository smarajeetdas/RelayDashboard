import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestCaseListComponent } from './pages/testcase-list/testcase-list.component';
import { TestCaseDetailComponent } from './pages/testcase-detail/testcase-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TestCaseListComponent
  },
  {
    path: 'history/:id',
    loadChildren: () => import('./pages/execution-history/execution-history.module').then(m => m.ExecutionHistoryModule)
  },
  {
    path: ':id',
    component: TestCaseDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestCasesRoutingModule { }