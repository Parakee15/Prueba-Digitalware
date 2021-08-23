import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleLayoutComponent } from './layouts/simple-layout/simple-layout.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UnauthGuard } from './core/guards/unauth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication/login',
    pathMatch: 'full',
  },

  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      {
        canLoad: [UnauthGuard],
        path: 'authentication',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },

  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      {
        canLoad: [AuthGuard, RoleGuard],
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          roles: ['ROLE_ADMIN']
        }
      },
      {
        canLoad: [AuthGuard],
        path: 'aircraft',
        loadChildren: () => import('./modules/aircraft/aircraft.module').then(m => m.AircraftModule),
        data: {
          roles: ['ROLE_ADMIN']
        }
      }, {
        canLoad: [AuthGuard],
        path: 'rentals',
        loadChildren: () => import('./modules/rentals/rentals.module').then(m => m.RentalsModule),
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_USER']
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
