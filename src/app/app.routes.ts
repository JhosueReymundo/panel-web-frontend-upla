import { Routes } from '@angular/router';
import { noAuthGuard } from './core/guards/no-auth-guard';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'login'
    },
    {
        path: 'login',
        canActivate: [noAuthGuard],
        //loadComponent: () => import('./modules/inicio/general/general').then(m => m.General)
        loadComponent: () => import('./modules/auth/pages/login/login/login').then(m => m.Login)
    },
    {
        path:'',
        loadComponent:()=>import('./shared/components/layout/layout').then(m=>m.Layout),
        canActivate: [authGuard],
        children:[
            {
                path:'inicio',
                loadChildren:()=>import('./modules/inicio/inicio.routes').then(m=>m.INICIO_ROUTES)
            },
            {
                path: 'home',
                loadChildren:()=>import('./modules/home/home.routes').then(m=>m.HOME_ROUTES),
                canActivate: [roleGuard(['Administrador'])]
            },
            {
                path: 'escuelas',
                loadChildren: () => import('./modules/escuela/escuela.routes').then(m => m.ESCUELA_ROUTES),
                canActivate: [roleGuard(['Administrador'])]
            },
            {
                path: 'roles',
                loadChildren: () => import('./modules/rol/rol.routes').then(m => m.ROL_ROUTES),
                canActivate: [roleGuard(['Administrador'])]
            },
            {
                path: 'dependencias',
                loadChildren: () => import('./modules/dependencia/dependencia.routes').then(m => m.DEPENDENCIA_ROUTES),
                canActivate: [roleGuard(['Administrador'])]
            },
            {
                path: 'servicios',
                loadChildren: () => import('./modules/servicio/servicios.routes').then(m => m.SERVICIOS_ROUTES),
                canActivate: [roleGuard(['Administrador'])]
            },
            {
                path: 'productos',
                loadChildren: () => import('./modules/producto/producto.routes').then(m => m.PRODUCTOS_ROUTES),
                canActivate: [roleGuard(['Administrador'])]
            },
            {
                path:'documentos',
                loadChildren:()=>import('./modules/documentogestion/documento.routes').then(m=>m.DOCUMENTOS_ROUTES),
                canActivate: [roleGuard(['Administrador'])]
            },
            {
                path:'horarios',
                loadChildren:()=>import('./modules/horario/horario.routes').then(m=>m.HORARIOS_ROUTES),
                canActivate: [roleGuard(['Administrador'])]
            },
            {
                path:'usuarios',
                loadChildren:()=>import('./modules/usuario/usuario.routes').then(m=>m.HORARIOS_ROUTES),
                canActivate: [roleGuard(['Administrador'])]
            },
            {
                path:'comunicados',
                loadChildren:()=>import('./modules/comunicado/comunicado.routes').then(m=>m.COMUNICADOS_ROUTES),
                canActivate: [roleGuard(['Director de escuela'])]
            },
            {
                path:'encuestas',
                loadChildren:()=>import('./modules/encuesta/encuesta.routes').then(m=>m.ENCUESTAS_ROUTES),
                canActivate: [roleGuard(['Administrador'])]
            },
            {
                path:'nosotros',
                loadChildren:()=>import('./modules/nosotros/nosotros.routes').then(m=>m.NOSOTROS_ROUTES),
                canActivate: [roleGuard(['Administrador'])]
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'inicio'
    }
];
