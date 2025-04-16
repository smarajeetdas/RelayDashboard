import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import pages and components
import { EndpointListComponent } from './pages/endpoint-list/endpoint-list.component';
import { EndpointDetailComponent } from './pages/endpoint-detail/endpoint-detail.component';

const routes: Routes = [
  { path: '', component: EndpointListComponent },
  { path: ':id', component: EndpointDetailComponent }
];

@NgModule({
  declarations: [
    EndpointListComponent,
    EndpointDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class EndpointsModule { }