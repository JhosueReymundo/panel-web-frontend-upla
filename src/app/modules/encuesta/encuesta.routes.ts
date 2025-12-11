import { Routes } from '@angular/router';

export const ENCUESTAS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/encuesta-list/encuesta-list').then(m => m.EncuestaList)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./pages/encuesta-create/encuesta-create').then(m => m.EncuestaCreate)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./pages/encuesta-edit/encuesta-edit').then(m => m.EncuestaEdit)
  },
  {
    path: ':id/builder',  
    loadComponent: () => import('./pages/encuesta-builder/encuesta-builder').then(m => m.EncuestaBuilder)
  },
  {
    path: ':id/estadisticas',  
    loadComponent: () => import('./respuestas/encuesta-respuestas/encuesta-respuestas').then(m => m.EncuestaRespuestas)
  }
];