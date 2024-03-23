import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvVars } from '../Env';
import { Router } from '@angular/router';
import { Statics } from '../Statics';
import { Login } from '../Objects/TokenLogin';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  data = {
    email: '',
    wachtwoord: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private appComponent: AppComponent
  ) {}

  LogIn() {
    this.http
      .post<Login>(EnvVars.Api + 'Login', this.data)
      .subscribe((data: Login) => {
        if (data != null) {
          Statics.Token = data.token;
          Statics.Rol = data.rol;
          window.localStorage.setItem('Vista.Examen.Token.Planner', data.token);
          window.localStorage.setItem('Vista.Examen.Rol.Planner', data.rol);

          this.router.navigate(['/']);
          this.appComponent.checkLocalStorage();
          return;
        }
        console.log('Failed');
      });
  }
}
