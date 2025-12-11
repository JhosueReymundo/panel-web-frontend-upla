import { Routes } from '@angular/router';

export const DOCUMENTOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/documentog-list/documentog-list').then(m => m.DocumentogList)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./pages/documentog-create/documentog-create').then(m => m.DocumentogCreate)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./pages/documentog-edit/documentog-edit').then(m => m.DocumentogEdit)
  }
];