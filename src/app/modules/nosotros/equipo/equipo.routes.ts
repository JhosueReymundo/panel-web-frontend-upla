import { Routes } from '@angular/router';

export const EQUIPO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/equipo-list/equipo-list').then(m => m.EquipoList)
  },
  {
    path: 'nuevo',
    loadComponent: () =>
      import('./pages/equipo-create/equipo-create').then(m => m.EquipoCreate)
  },
  {
    path: ':id/editar',
    loadComponent: () =>
      import('./pages/equipo-edit/equipo-edit').then(m => m.EquipoEdit)
  }
];
