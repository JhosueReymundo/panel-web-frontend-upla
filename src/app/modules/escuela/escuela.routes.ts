import { Routes } from '@angular/router';

export const ESCUELA_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/escuela-list/escuela-list').then(m => m.EscuelaList)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./pages/escuela-create/escuela-create').then(m => m.EscuelaCreate)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./pages/escuela-edit/escuela-edit').then(m => m.EscuelaEdit)
  }
];