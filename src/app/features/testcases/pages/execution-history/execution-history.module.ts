import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ExecutionHistoryComponent } from './execution-history.component';

const routes: Routes = [
  {
    path: '',
    component: ExecutionHistoryComponent
  }
];

@NgModule({
  declarations: [
    ExecutionHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ExecutionHistoryModule { }