import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnvVars } from '../Env';
import { Klas } from '../Objects/KlasObject';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  // Declare variables
  data = {
    naam: '',
    achternaam: '',
    email: '',
    wachtwoord: '',
    klass: '',
  };

  Klasses: any;

  constructor(private http: HttpClient, private router: Router) {}

  // Load all calsses
  ngOnInit(): void {
    this.http
      .get<Klas>(EnvVars.Api + 'SelectAllKlasses')
      .subscribe((data: Klas) => {
        console.log(data);
        this.Klasses = data;
      });
  }

  // Create user via API
  SignUp() {
    console.log(this.data.klass);
    this.http
      .post(EnvVars.Api + 'ÇreateUser', this.data)
      .subscribe((data) => {});
    this.router.navigate(['/login']);
  }
}
