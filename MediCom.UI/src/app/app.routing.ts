import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component'; 

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  // {
  //   path: 'mastersx',
  //   data: { title: 'Masters' },
  //   component: DefaultLayoutComponent,
  //   children: [
  //     {
  //       path: 'group',
  //    //   component: LabTestGroupsComponent
  //     },
  //     {
  //       path: 'labtest',
  //     //  component: LabTestComponent
  //     }
  //   ]
  // }, {
  //   path: 'patient',
  //   data: { title: 'Patient' },
  //   component: DefaultLayoutComponent,
  //   children: [
  //     {
  //       path: 'new',
  //       //component: NewPatiantComponent
  //     }
  //   ]
  // },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'masters',
        loadChildren: './views/masters/masters.module#MastersModule'
      },
      {
        path: 'patient',
        loadChildren: './views/patient/patient.module#PatientModule'
      },
      {
        path: '',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
