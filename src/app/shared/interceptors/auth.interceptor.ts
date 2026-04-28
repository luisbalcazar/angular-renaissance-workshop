import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenStorageService } from '../../features/auth/services/token-storage.service';

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const tokenService = inject(TokenStorageService);

  if (tokenService.token()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${tokenService.token()}`,
      },
    });
  }

  return next(req);
}
