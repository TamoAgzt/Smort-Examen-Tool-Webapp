import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  FirstName: string = '';
  LastName: string = '';
  Email: string = '';
  Password: string = '';
  Klas: string = '';
  apiData: any;

  constructor(private http: HttpClient) {}

  SignUp() {
    this.apiData = {
      naam: this.FirstName,
      achternaam: this.LastName,
      email: this.Email,
      wachtwoord: this.Password,
      klass: this.Klas,
    };
    this.http.post<any>(`http://devilskey.nl:7234/ÇreateUser`, this.apiData);
  }
}
