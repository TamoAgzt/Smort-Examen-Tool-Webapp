import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvVars } from '../Env';
import { Statics } from '../Statics';
import { ExamSchedule } from '../Objects/ObjectExamenWeek';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private http: HttpClient) {
    this.GetData();
  }

  ResponseData: ExamSchedule[] | undefined;
  examsForSelectedDate: ExamSchedule[] | undefined;

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

  examsPopup: boolean = false;
  selectedDay: any;
  SelectedExamesForTheDay: ExamSchedule[] | undefined;

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

      let Exames:ExamSchedule[] | undefined  = this.GetExameForDate(i);


      if(typeof Exames === 'object')
        if(Exames.length > 0){
          isToday += " Exames";
        }
          
      this.dates.push({ value: i, class: isToday });
    }

    for (let i = dayend; i < 6; i++) {
      this.dates.push({ value: i - dayend + 1, class: 'inactive' });
    }
    console.log(this.dates);
  };

  async prevMonth() {
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
    const data: ExamSchedule[] = await this.GetData();
     this.manipulate();
  }

  async nextMonth() {
    
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

    const data: ExamSchedule[] = await this.GetData();
    this.manipulate();

  }

  GetData(): Promise<ExamSchedule[]> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${Statics.Token}`,
    });
  
    return new Promise<ExamSchedule[]>((resolve, reject) => {
      this.http
        .get<ExamSchedule[]>(EnvVars.Api + `GetExamesForAMonth?month=${this.month + 1}&year=${this.year}`, {
          headers: header,
        })
        .subscribe(
          (data: ExamSchedule[]) => {
            this.ResponseData = data;
            console.log(data);
            console.log("GetData Done");
            resolve(data);  // Resolve the promise with the data
          },
          (error) => {
            console.error("Error in API call:", error);
            reject(error);  // Reject the promise with the error
          }
        );
    });
  }
  

  GetExameForDate(date: number) {
    let DateNew = new Date(this.year, this.month, date + 1);
    return this.ResponseData?.filter((examens) => {
      return (
        examens.agendaItem.tijd_Begin.split('T')[0] ===
        DateNew.toISOString().split('T')[0]
      );
    });
  }

  ShowExamsPopup(selectedDate: { value: number }) {
    // Check if selected date is active
      // selectedDate.value to get date
      this.selectedDay = selectedDate.value;

      // GetExameForDate to filter exams for selected date
      this.SelectedExamesForTheDay = this.GetExameForDate(
        this.selectedDay,
      );
      
      this.examsPopup = true;
  }
}
