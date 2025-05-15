import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

// Import components
import { MasterSuiteListComponent } from './pages/mastersuite-list/mastersuite-list.component';
import { MasterSuiteDetailComponent } from './pages/mastersuite-detail/mastersuite-detail.component';
import { MasterSuiteResultComponent } from './pages/mastersuite-result/mastersuite-result.component';

const routes: Routes = [
  { path: '', component: MasterSuiteListComponent },
  { path: ':id', component: MasterSuiteDetailComponent },
  { path: ':id/results/:resultId', component: MasterSuiteResultComponent }
];

@NgModule({
  declarations: [
    MasterSuiteListComponent,
    MasterSuiteDetailComponent,
    MasterSuiteResultComponent
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
export class MasterSuitesModule { }