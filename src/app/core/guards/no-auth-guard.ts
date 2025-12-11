import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../../modules/auth/services/authservice';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(Authservice);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  // Si ya está autenticado, redirigir al dashboard
  router.navigate(['/inicio']); //cambiar por home o inicio
  return false;
};
