import { Component, OnInit } from '@angular/core';
import { Exams } from '../../assets/placeholder_exams';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Statics } from '../Statics';
import { EnvVars } from '../Env';
import { ExamSchedule } from '../Objects/ObjectExamenWeek';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit{

  Accounts: any;
  Exams: ExamSchedule[] | undefined;

  timeofday: string = "Goeie Morgen";

  constructor(public http:HttpClient, public router:Router) 
  {
    if(Statics.Token == ""){
      router.navigate(["/login"]);
    }
    
    const header = new HttpHeaders({
      Authorization: `Bearer ${Statics.Token}`,
    });

    this.http.get(EnvVars.Api + "GetUserData", { headers: header }).subscribe((data:any) => {
      this.Accounts = data[0];

  });

  this.http.get<ExamSchedule[]>(EnvVars.Api + "GetExamesForAweek", { headers: header }).subscribe((data:any) => {
    this.Exams = data;
    console.log(data);
});
  }

  ngOnInit(): void {



  }
}
