/* import { Routes } from '@angular/router';
import { Nosotros } from './nosotros';

export const NOSOTROS_ROUTES: Routes = [
  {
    path: '',
    component: Nosotros
  },
  {
    path: 'equipo',
    loadChildren: () =>
      import('./equipo/equipo.routes').then(m => m.EQUIPO_ROUTES)
  },
   {
    path: 'mision',
    loadChildren: () =>
      import('./mision/mision.routes').then(m => m.MISION_ROUTES)
  },
  {
    path: 'vision',
    loadChildren: () =>
      import('./vision/vision.routes').then(m => m.VISION_ROUTES)
  },
  {
    path: 'valores',
    loadChildren: () =>
      import('./valores/valores.routes').then(m => m.VALORES_ROUTES)
  } 
]; */

import { Routes } from '@angular/router';

export const NOSOTROS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./nosotros').then(m => m.Nosotros),
    children: [
      {
        path: '',
        redirectTo: 'equipo',
        pathMatch: 'full'
      },
      {
        path: 'equipo',
        loadChildren: () => import('./equipo/equipo.routes').then(m => m.EQUIPO_ROUTES)
      },
       {
        path: 'mision',
        loadChildren: () => import('./mision/mision.routes').then(m => m.MISION_ROUTES)
      },
      {
        path: 'vision',
        loadChildren: () => import('./vision/vision.routes').then(m => m.VISION_ROUTES)
      },
      {
        path: 'valores',
        loadChildren: () => import('./valor/valor.routes').then(m => m.VALOR_ROUTES)
      } 
    ]
  }
];
