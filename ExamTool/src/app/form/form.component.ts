import { Component, OnInit } from '@angular/core';
import { Exam, Exams } from '../../assets/placeholder_exams';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvVars } from '../Env';
import { Klas } from '../Objects/KlasObject';
import { Statics } from '../Statics';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  agendaItem = {
    klas_Id: 0,
    exameId: 0,
    lokaal_Id: 0,
    beginTijd: '',
    eindTijd: '',
  };

  Exame = {
    toezichthouder_Id: 0,
    naam_Examen: '',
    vak_Examen: '',
  };

  Toezichthouders: any;
  klasses: any;
  lokaal: any;

  Exams = Exams;
  Image: string = '';

  constructor(private http: HttpClient) {
    const header = new HttpHeaders({
      Authorization: `Bearer ${Statics.Token}`,
    });

    this.http
      .get<any>(EnvVars.Api + 'SelectAllKlasses')
      .subscribe((data: any) => {
        console.log(data);
        this.klasses = data;
      });

    this.http
      .get<any>(EnvVars.Api + 'GetToeZichtHouder', { headers: header })
      .subscribe((data: any) => {
        console.log(data);
        this.Toezichthouders = data;
      });

    this.http
      .get<any>(EnvVars.Api + 'GetLokaal', { headers: header })
      .subscribe((data: any) => {
        console.log(data);
        this.lokaal = data;
      });
  }

  ngOnInit(): void {}

  save() {
    console.log(this.Exame);
    console.log(this.agendaItem);
    console.log('Save');
  }
}
