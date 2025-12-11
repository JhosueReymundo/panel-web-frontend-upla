import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-list/home-list').then(m => m.HomeList)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./pages/home-create/home-create').then(m => m.HomeCreate)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./pages/home-edit/home-edit').then(m => m.HomeEdit)
  }
];