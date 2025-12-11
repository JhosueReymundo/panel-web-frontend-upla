import { Routes } from '@angular/router';

export const HORARIOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/horario-list/horario-list').then(m => m.HorarioList)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./pages/horario-create/horario-create').then(m => m.HorarioCreate)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./pages/horario-edit/horario-edit').then(m => m.HorarioEdit)
  }
];