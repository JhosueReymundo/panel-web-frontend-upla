import { Routes } from '@angular/router';
import { noAuthGuard } from './core/guards/no-auth-guard';

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
        children:[
            {
                path:'inicio',
                loadChildren:()=>import('./modules/inicio/inicio.routes').then(m=>m.INICIO_ROUTES)
            },
            {
                path: 'home',
                loadChildren:()=>import('./modules/home/home.routes').then(m=>m.HOME_ROUTES)
            },
            {
                path: 'escuelas',
                loadChildren: () => import('./modules/escuela/escuela.routes').then(m => m.ESCUELA_ROUTES)
            },
            {
                path: 'roles',
                loadChildren: () => import('./modules/rol/rol.routes').then(m => m.ROL_ROUTES)
            },
            {
                path: 'dependencias',
                loadChildren: () => import('./modules/dependencia/dependencia.routes').then(m => m.DEPENDENCIA_ROUTES)
            },
            {
                path: 'servicios',
                loadChildren: () => import('./modules/servicio/servicios.routes').then(m => m.SERVICIOS_ROUTES)
            },
            {
                path: 'productos',
                loadChildren: () => import('./modules/producto/producto.routes').then(m => m.PRODUCTOS_ROUTES)
            },
            {
                path:'documentos',
                loadChildren:()=>import('./modules/documentogestion/documento.routes').then(m=>m.DOCUMENTOS_ROUTES)
            },
            {
                path:'horarios',
                loadChildren:()=>import('./modules/horario/horario.routes').then(m=>m.HORARIOS_ROUTES)
            },
            {
                path:'usuarios',
                loadChildren:()=>import('./modules/usuario/usuario.routes').then(m=>m.HORARIOS_ROUTES)
            },
            {
                path:'comunicados',
                loadChildren:()=>import('./modules/comunicado/comunicado.routes').then(m=>m.COMUNICADOS_ROUTES)
            },
            {
                path:'encuestas',
                loadChildren:()=>import('./modules/encuesta/encuesta.routes').then(m=>m.ENCUESTAS_ROUTES)
            },
            {
                path:'nosotros',
                loadChildren:()=>import('./modules/nosotros/nosotros.routes').then(m=>m.NOSOTROS_ROUTES)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'inicio'
    }
];
