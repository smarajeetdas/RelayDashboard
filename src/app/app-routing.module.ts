import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DesktopAutomationOverviewComponent } from './components/desktop-automation-overview/desktop-automation-overview.component';
import { MobileAutomationOverviewComponent } from './components/mobile-automation-overview/mobile-automation-overview.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'desktop-automation',
    component: DesktopAutomationOverviewComponent
  },
  {
    path: 'mobile-automation',
    component: MobileAutomationOverviewComponent
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
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'performance-lab',
    loadChildren: () => import('./features/performance-lab/performance-lab.module').then(m => m.PerformanceLabModule)
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