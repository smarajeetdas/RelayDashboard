import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DetailSidebarComponent } from './components/detail-sidebar/detail-sidebar.component';

@NgModule({
  declarations: [
    DetailSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    DetailSidebarComponent,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule { }