import { Routes } from "@angular/router";

export const ROL_ROUTES: Routes=[
    {
        path:'',
        loadComponent:()=>import('./pages/rol-list/rol-list').then(m=>m.RolList)
    },
    {
        path: 'nuevo',
        loadComponent: () => import('./pages/rol-create/rol-create').then(m => m.RolCreate)
    },
    {
        path: ':id/editar',
        loadComponent: () => import('./pages/rol-edit/rol-edit').then(m => m.RolEdit)
    }
]