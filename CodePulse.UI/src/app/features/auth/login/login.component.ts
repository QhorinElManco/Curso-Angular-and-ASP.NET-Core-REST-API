import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LoginRequestModel} from '@features/auth/models/login-request.model';

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

  onFormSubmit() {
    console.log(this.model)
  }
}
