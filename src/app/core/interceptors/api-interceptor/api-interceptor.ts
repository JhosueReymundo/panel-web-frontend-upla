import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiConfigServiceTs } from '../../../config/api-config.service.ts';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiConfig = inject(ApiConfigServiceTs);

  // Solo modificar URLs que empiecen con /api
  if (req.url.startsWith('/api')) {
    const apiUrl = apiConfig.getApiUrl();
    const fullUrl = req.url.replace('/api', apiUrl);

    const clonedReq = req.clone({
      url: fullUrl
    });

    return next(clonedReq);
  }

  // Para URLs completas
  if (req.url.startsWith('http')) {
    return next(req);
  }

  // Para recursos locales (assets, etc.)
  return next(req);
};
