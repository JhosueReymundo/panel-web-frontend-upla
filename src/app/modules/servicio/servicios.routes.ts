import { Routes } from '@angular/router';

export const SERVICIOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/servicio-list/servicio-list').then(m => m.ServicioList)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./pages/servicio-create/servicio-create').then(m => m.ServicioCreate)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./pages/servicio-edit/servicio-edit').then(m => m.ServicioEdit)
  }
];