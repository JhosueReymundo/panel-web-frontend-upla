import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Authservice } from '../../modules/auth/services/authservice';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Authservice);
  const router = inject(Router);
  const token = authService.getAccessToken();

  // Clonar request y agregar token si existe
  let authReq = req;
  if (token && !req.url.includes('/auth/login') && !req.url.includes('/auth/refresh')) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el error es 401 (Unauthorized) y no es login/refresh, intentar refresh
      if (error.status === 401 && !req.url.includes('/auth/login') && !req.url.includes('/auth/refresh')) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            // Reintentar request original con nuevo token
            const newToken = authService.getAccessToken();
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(retryReq);
          }),
          catchError((refreshError) => {
            // Si el refresh falla, hacer logout
            authService.clearSessionAndRedirect();
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
