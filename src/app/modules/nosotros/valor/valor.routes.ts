import { Routes } from '@angular/router';

export const VALOR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/valor-list/valor-list').then(m => m.ValorList)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./pages/valor-create/valor-create').then(m => m.ValorCreate)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./pages/valor-edit/valor-edit').then(m => m.ValorEdit)
  }
];