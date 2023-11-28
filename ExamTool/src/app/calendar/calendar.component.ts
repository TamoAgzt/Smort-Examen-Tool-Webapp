import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../Objects/calendar.service';
import { Router } from '@angular/router';
import { Statics } from '../Statics';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss', '../Objects/calendar.scss'],
})
export class CalendarComponent implements OnInit {
  constructor(public calendarService: CalendarService, public router:Router) 
  {
    if(Statics.Token == ""){
      router.navigate(["/login"]);
    }
    this.calendarService.GetData();
  }
  

  ngOnInit(): void {
    this.calendarService.manipulate();
  }
}
