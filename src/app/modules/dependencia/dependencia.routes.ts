import { Routes } from "@angular/router";

export const DEPENDENCIA_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dependencia-list/dependencia-list').then(m => m.DependenciaList)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./pages/dependencia-create/dependencia-create').then(m => m.DependenciaCreate)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./pages/dependencia-edit/dependencia-edit').then(m => m.DependenciaEdit)
  }
];