import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

// Components will be created later
// import { MasterSuiteListComponent } from './pages/mastersuite-list/mastersuite-list.component';
// import { MasterSuiteDetailComponent } from './pages/mastersuite-detail/mastersuite-detail.component';

const routes: Routes = [
  // { path: '', component: MasterSuiteListComponent },
  // { path: ':id', component: MasterSuiteDetailComponent }
];

@NgModule({
  declarations: [
    // MasterSuiteListComponent,
    // MasterSuiteDetailComponent
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