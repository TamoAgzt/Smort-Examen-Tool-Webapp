import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvVars } from '../Env';
import { Klas } from '../Objects/KlasObject';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit{
  data = {
    naam: '',
    achternaam: '',
    email: '',
    wachtwoord: '',
    klass: ''
  }

  Klasses: any;

  constructor (private http:HttpClient) {   }

  ngOnInit(): void {
    this.http.get<Klas>(EnvVars.Api + "SelectAllKlasses").subscribe((data:Klas) => {
      console.log(data)
      this.Klasses = data;
    });
  }

  SignUp() {
    console.log(this.data.klass);
    this.http.post(EnvVars.Api + "ÇreateUser", this.data).subscribe((data) => {
    });
  }
}