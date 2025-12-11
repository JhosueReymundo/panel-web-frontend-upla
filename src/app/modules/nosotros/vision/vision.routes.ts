import { Routes } from '@angular/router';

export const VISION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/vision-list/vision-list').then(m => m.VisionList)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./pages/vision-create/vision-create').then(m => m.VisionCreate)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./pages/vision-edit/vision-edit').then(m => m.VisionEdit)
  }
];
