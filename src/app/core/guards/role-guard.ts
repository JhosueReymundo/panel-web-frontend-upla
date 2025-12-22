import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../../modules/auth/services/authservice';
import { inject } from '@angular/core';

/**
 * Guard para proteger rutas según roles
 * Uso: canActivate: [roleGuard(['Admin', 'Moderador'])]
 */


export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(Authservice);
    const router = inject(Router);

    // Verificar si está autenticado
    if (!authService.isAuthenticated()) {
      router.navigate(['/login'], { 
        queryParams: { returnUrl: state.url } 
      });
      return false;
    }

    if (authService.isAdmin()) {
      return true;
    }

    // Obtener el rol del usuario
    const userRole = authService.getUserRole();

    // Verificar si el rol está en los roles permitidos
    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }

    // Si no tiene permiso, redirigir a página de acceso denegado
    console.warn(`⚠️ Acceso denegado: El usuario con rol "${userRole}" intentó acceder a una ruta que requiere: ${allowedRoles.join(', ')}`);
    router.navigate(['/acceso-denegado']);
    return false;
  };
};
