import { Routes } from "@angular/router";

export const INICIO_ROUTES: Routes=[
    {
        path:'',
        loadComponent:()=>import('./general/general').then(m=>m.General)
    }
]