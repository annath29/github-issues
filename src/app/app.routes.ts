import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'issue/:number',
    loadComponent: () => import('../app/modules/issues/pages/issue/issue-page'),
  },
  {
    path: 'issues',
    loadComponent: () => import('../app/modules/issues/pages/issues-list/issues-list-page'),
  },
  { 
    path:'**',
    redirectTo: 'issues'
  }

];
