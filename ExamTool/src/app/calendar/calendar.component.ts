import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../Objects/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss', '../Objects/calendar.scss'],
})
export class CalendarComponent implements OnInit {
  constructor(public calendarService: CalendarService) {
    this.calendarService.GetData();
  }

  ngOnInit(): void {
    this.calendarService.manipulate();
  }
}
