import { Routes } from '@angular/router';

export const COMUNICADOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/comunicado-list/comunicado-list').then(m => m.ComunicadoList)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./pages/comunicado-create/comunicado-create').then(m => m.ComunicadoCreate)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./pages/comunicado-edit/comunicado-edit').then(m => m.ComunicadoEdit)
  }
];