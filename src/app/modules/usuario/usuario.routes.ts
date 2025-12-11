import { Routes } from '@angular/router';

export const HORARIOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/usuario-list/usuario-list').then(m => m.UsuarioList)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./pages/usuario-create/usuario-create').then(m => m.UsuarioCreate)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./pages/usuario-edit/usuario-edit').then(m => m.UsuarioEdit)
  }
];