import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  constructor(private http: HttpClient) {
    this.GetData()
  }

  ResponseData: any = null;

  GetData() {
    this.http.get('http://httpstat.us/418').subscribe((data) => {
      console.table(data)
      this.ResponseData = data;
    });
  }
}
