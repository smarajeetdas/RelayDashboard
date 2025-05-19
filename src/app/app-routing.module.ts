import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DesktopAutomationOverviewComponent } from './components/desktop-automation-overview/desktop-automation-overview.component';
import { MobileAutomationOverviewComponent } from './components/mobile-automation-overview/mobile-automation-overview.component';
import { PerformanceLabOverviewComponent } from './components/performance-lab-overview/performance-lab-overview.component';
import { ChaosSimulatorOverviewComponent } from './components/chaos-simulator-overview/chaos-simulator-overview.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'desktop-automation',
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: DesktopAutomationOverviewComponent
      }
    ]
  },
  {
    path: 'mobile-automation',
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: MobileAutomationOverviewComponent
      }
    ]
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
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: PerformanceLabOverviewComponent
      },
      {
        path: 'details',
        loadChildren: () => import('./features/performance-lab/performance-lab.module').then(m => m.PerformanceLabModule)
      }
    ]
  },
  {
    path: 'chaos-simulator',
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: ChaosSimulatorOverviewComponent
      }
    ]
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