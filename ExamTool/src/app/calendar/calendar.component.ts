import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exam, Exams } from '../../assets/placeholder_exams';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  constructor(private http: HttpClient) {
    this.GetData()
  }

  Exams:Exam[] = Exams;
  ResponseData: any = null;

  GetData() {
    this.http.get('http://httpstat.us/418').subscribe((data) => {
      console.table(data)
      this.ResponseData = data;
    });
  }
}
