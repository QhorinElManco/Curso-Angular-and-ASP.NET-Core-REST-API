import {CanActivateFn, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {inject} from '@angular/core';
import {AuthService} from '@features/auth/services/auth.service';
import {jwtDecode, JwtPayload} from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();

  // Check for the JWT Token
  let token = cookieService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodedToken = jwtDecode<JwtPayload>(token);

    const expirationDate = (decodedToken.exp || (new Date().getTime() - 1000)) * 1000;
    const currentDate = new Date().getTime();

    if (expirationDate > currentDate) {
      authService.logout();
      return router.createUrlTree(['auth/login'], {queryParams: {returnUrl: state.url}});
    }

    return user.roles.includes("Writer");
  }

  authService.logout();
  return router.createUrlTree(['auth/login'], {queryParams: {returnUrl: state.url}});
};
