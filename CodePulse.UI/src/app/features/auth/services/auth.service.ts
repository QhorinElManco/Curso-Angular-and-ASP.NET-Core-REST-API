import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {LoginRequestModel} from '@features/auth/models/login-request.model';
import {LoginResponseModel} from '@features/auth/models/login-response.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '@features/auth/models/user.model';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

  private urlBase: string = environment.urlBase;
  private urlAuth: string = `${this.urlBase}/api/auth`;

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  login(body: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.urlAuth}/login`, body);
  }

  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email && roles) {
      return {
        email,
        roles: roles.split(",")
      };
    }
    return undefined;
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/')
    this.$user.next(undefined)
  }
}
