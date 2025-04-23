import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailSidebarComponent } from './components/detail-sidebar/detail-sidebar.component';

@NgModule({
  declarations: [
    DetailSidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DetailSidebarComponent
  ]
})
export class SharedModule { }