import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LoginRequestModel} from '@features/auth/models/login-request.model';
import {AuthService} from '@features/auth/services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  model: LoginRequestModel = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private route: Router
  ) {
  }

  onLogin(): void {
    this.authService.login(this.model).subscribe({
      next: (response) => {

        this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');

        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });

        this.route.navigateByUrl('admin/blogposts').then(r => r);
      },
      error: (error) => console.log(error)
    })
  }
}
