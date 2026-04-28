import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { inject } from '@angular/core';
import { debounceTime, finalize, tap } from 'rxjs';

export function loaderInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const loaderService = inject(LoaderService);
  return next(req).pipe(
    debounceTime(300),
    tap(() => loaderService.show()),
    finalize(() => {
      loaderService.hide();
    }),
  );
}
