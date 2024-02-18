import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../Objects/calendar.service';
import { Router } from '@angular/router';
import { Statics } from '../Statics';
import { ExamSchedule } from '../Objects/ObjectExamenWeek';
import { EnvVars } from '../Env';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss', '../Objects/calendar.scss'],
})
export class CalendarComponent implements OnInit {
SelectedExamesForTheDay: any;
api:string = EnvVars.Api;

  constructor(public calendarService: CalendarService, public router:Router) 
  {
    if(Statics.Token == ""){
      router.navigate(["/login"]);
    }
  }

  async ngOnInit(): Promise<void> {
    const data: ExamSchedule[] = await this.calendarService.GetData();
    this.calendarService.manipulate();
  }
}
