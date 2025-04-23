import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'endpoints',
    loadChildren: () => import('./features/endpoints/endpoints.module').then(m => m.EndpointsModule)
  },
  {
    path: 'testcases',
    loadChildren: () => import('./features/testcases/testcases.module').then(m => m.TestCasesModule)
  },
  {
    path: 'testsuites',
    loadChildren: () => import('./features/testsuites/testsuites.module').then(m => m.TestSuitesModule)
  },
  {
    path: 'mastersuites',
    loadChildren: () => import('./features/mastersuites/mastersuites.module').then(m => m.MasterSuitesModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }