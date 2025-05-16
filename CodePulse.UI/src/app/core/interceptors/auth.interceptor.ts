import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {CookieService} from "ngx-cookie-service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const authorization = cookieService.get('Authorization');

  if (authorization) {
    const authReq = req.clone({
      headers: new HttpHeaders().set('Authorization', authorization)
    });
    return next(authReq);
  }

  return next(req);
};
