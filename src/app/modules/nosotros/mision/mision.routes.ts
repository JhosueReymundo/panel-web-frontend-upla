import { Routes } from '@angular/router';

export const MISION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/mision-list/mision-list').then(m => m.MisionList)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./pages/mision-create/mision-create').then(m => m.MisionCreate)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./pages/mision-edit/mision-edit').then(m => m.MisionEdit)
  }
];
