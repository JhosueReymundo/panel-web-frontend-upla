import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../../modules/auth/services/authservice';
import { inject } from '@angular/core';

/**
 * Guard para proteger rutas según permisos específicos
 * Uso: canActivate: [permissionGuard('usuarios.crear')]
 */
export const permissionGuard = (requiredPermission: string): CanActivateFn => {
  return (route, state) => {
    const authService = inject(Authservice);
    const router = inject(Router);

    // Verificar autenticación
    if (!authService.isAuthenticated()) {
      router.navigate(['/login'], { 
        queryParams: { returnUrl: state.url } 
      });
      return false;
    }

    // Verificar permiso (necesitarías extender AuthService para obtener permisos)
    const hasPermission = authService.hasPermission(requiredPermission);

    if (hasPermission) {
      return true;
    }

    console.warn(`⚠️ Permiso denegado: Se requiere "${requiredPermission}"`);
    router.navigate(['/acceso-denegado']);
    return false;
  };
};