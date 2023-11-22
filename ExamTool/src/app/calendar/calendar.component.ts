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
    this.GetData();
    this.manipulate();
  }

  Exams: Exam[] = Exams;
  ResponseData: any = null;

  GetData() {
    this.http.get('http://httpstat.us/418').subscribe((data) => {
      console.table(data);
      this.ResponseData = data;
    });
  }

  date: any = new Date();
  year: number = this.date.getFullYear();
  month: number = this.date.getMonth();

  months = [
    'Januari',
    'Februari',
    'Maart',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Augustus',
    'September',
    'Oktober',
    'November',
    'December',
  ];

  datum: any = '';
  dates: { value: number; class: string }[] = [];

  // Function to generate the calendar
  manipulate = () => {
    this.dates = [];

    // Get the first day of the month
    let dayone = new Date(this.year, this.month, 1).getDay();
    // Get the last date of the month
    let lastdate = new Date(this.year, this.month + 1, 0).getDate();
    // Get the day of the last date of the month
    let dayend = new Date(this.year, this.month, lastdate).getDay();
    // Get the last date of the previous month
    let monthlastdate = new Date(this.year, this.month, 0).getDate();
    // Variable to store the generated calendar HTML

    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
      this.dates.push({ value: monthlastdate - i + 1, class: 'inactive' });
    }

    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
      // Check if the current date is today
      let isToday =
        i === this.date.getDate() &&
        this.month === new Date().getMonth() &&
        this.year === new Date().getFullYear()
          ? 'active'
          : '';
      this.dates.push({ value: i, class: isToday });
    }

    for (let i = dayend; i < 6; i++) {
      this.dates.push({ value: i - dayend + 1, class: 'inactive' });
    }
    console.log(this.dates);
  };

  prevMonth() {
    this.month -= 1;
    if (this.month < 0 || this.month > 11) {
      // Set the date to the first day of the
      // month with the new year
      this.date = new Date(this.year, this.month, new Date().getDate());

      // Set the year to the new year
      this.year = this.date.getFullYear();

      // Set the month to the new month
      this.month = this.date.getMonth();
    } else {
      // Set the date to the current date
      this.date = new Date();
    }

    // Call the manipulate function to
    // update the calendar display
    this.manipulate();
  }

  nextMonth() {
    this.month += 1;
    if (this.month < 0 || this.month > 11) {
      // Set the date to the first day of the
      // month with the new year
      this.date = new Date(this.year, this.month, new Date().getDate());

      // Set the year to the new year
      this.year = this.date.getFullYear();

      // Set the month to the new month
      this.month = this.date.getMonth();
    } else {
      // Set the date to the current date
      this.date = new Date();
    }

    // Call the manipulate function to
    // update the calendar display
    this.manipulate();
  }
}
