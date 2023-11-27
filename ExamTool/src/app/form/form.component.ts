import { Component, OnInit } from '@angular/core';
import { Exam, Exams } from '../../assets/placeholder_exams';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvVars } from '../Env';
import { Statics } from '../Statics';
import { ExamSchedule } from '../Objects/ObjectExamenWeek';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss', '../calendar/calendar.component.scss'],
})
export class FormComponent implements OnInit {
  ExamenInplannen = {
    toezichthouder_Id: 0,
    naam_Examen: '',
    vak_Examen: '',
    klas_Id: 0,
    examen_Id: 0,
    lokaal_Id: 0,
    beginTijd: Date.now,
    eindTijd: Date.now,
  };

  Toezichthouders: any;
  klasses: any;
  lokaal: any;

  Exams = Exams;
  Image: string = '';
  ResponseData: ExamSchedule[] | undefined;

  constructor(private http: HttpClient) {
    this.manipulate();
    let header = new HttpHeaders({
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

    this.http
      .get<ExamSchedule[]>(EnvVars.Api + 'GetExamesForAMonth', {
        headers: header,
      })
      .subscribe((data: ExamSchedule[]) => {
        this.ResponseData = data;
        console.log(data);
      });
  }

  date: any = new Date();
  year: number = this.date.getFullYear();
  month: number = this.date.getMonth();

  GetExameForDate(date: number, dateClass: string) {
    let DateNew = new Date(this.year, this.month, date);
    return this.ResponseData?.filter((examens) => {
      if (
        examens.agendaItem.tijd_Begin.split('T')[0] ===
          DateNew.toISOString().split('T')[0] &&
        dateClass != 'inactive'
      )
        return examens;

      return null;
    });
  }

  ngOnInit(): void {}

  save() {
    let header = new HttpHeaders({
      Authorization: `Bearer ${Statics.Token}`,
    });

    console.log(this.ExamenInplannen);

    this.http
      .post(EnvVars.Api + 'ExamenInPlannen', this.ExamenInplannen, {
        headers: header,
      })
      .subscribe();
  }

  AddPopup: boolean = false;
  AddClass: boolean = false;
  AddClassRoom: boolean = false;

  Klas: string = '';
  Mentor: string = '';
  Lokaal: string = '';
  NewLokaal: string = '';

  ToggleAddClass() {
    this.AddPopup = true;
    this.AddClass = true;
  }
  ToggleAddClassRoom() {
    this.AddPopup = true;
    this.AddClassRoom = true;
  }

  ClassData = {
    naam: this.Klas,
    mentor: this.Mentor,
  };

  ClassRoomData = {
    examenLokaal: '',
  };

  SaveClass() {
    const header = new HttpHeaders({
      Authorization: `Bearer ${Statics.Token}`,
    });

    this.http
      .post(EnvVars.Api + 'CreateKlas', this.ClassData, { headers: header })
      .subscribe((ClassData) => {});

    this.AddPopup = false;
    this.AddClass = false;
  }

  RemoveClass() {
    console.log(this.ExamenInplannen.klas_Id);
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Statics.Token}`,
    });

    this.http
      .delete(EnvVars.Api + 'DeleteKlas', {
        headers: header,
        body: this.ExamenInplannen.klas_Id,
      })
      .subscribe();
  }

  SaveClassRoom() {
    const header = new HttpHeaders({
      Authorization: `Bearer ${Statics.Token}`,
    });

    console.log(this.NewLokaal);

    if (this.NewLokaal == '') return;

    this.ClassRoomData.examenLokaal = this.NewLokaal;

    this.http
      .post(EnvVars.Api + 'AddLokaal', this.ClassRoomData, { headers: header })
      .subscribe((ClassRoomData) => {});

    this.AddPopup = false;
    this.AddClassRoom = false;
  }

  CancelAdding() {
    this.AddPopup = false;
    this.AddClassRoom = false;
    this.AddClass = false;
  }

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
