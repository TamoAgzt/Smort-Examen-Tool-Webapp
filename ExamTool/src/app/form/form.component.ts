import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../Objects/calendar.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvVars } from '../Env';
import { Statics } from '../Statics';
import { ExamSchedule } from '../Objects/ObjectExamenWeek';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss', '../Objects/calendar.scss'],
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

  ResponseData: ExamSchedule[] | undefined;

  constructor(
    private http: HttpClient,
    public calendarService: CalendarService,
    public router: Router
  ) {
    if (Statics.Token == '') {
      router.navigate(['/login']);
    }

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

  async ngOnInit(): Promise<void> {
    const data: ExamSchedule[] = await this.calendarService.GetData();
    this.calendarService.manipulate();
  }

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
    this.notifyUser('Successvol opgeslagen!', 'success');
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
    this.notifyUser('Successvol opgeslagen!', 'success');
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
    this.notifyUser('Successvol verwijderd!', 'success');
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
    this.notifyUser('Successvol opgeslagen!', 'success');
  }

  CancelAdding() {
    this.AddPopup = false;
    this.AddClassRoom = false;
    this.AddClass = false;
  }

  notifPopUp: boolean = false;
  notiffication: string = 'notif';
  statusSuccess: boolean = false;
  statusFail: boolean = false;

  notifyUser(message: string, status: string) {
    this.notifPopUp = true;
    this.notiffication = message;

    if (status == 'success') {
      this.statusSuccess = true;
    }
    if (status == 'failure') {
      this.statusFail = true;
    }
    setInterval(() => {
      this.notifPopUp = false;
      this.statusSuccess = false;
      this.statusFail = false;
    }, 3000);
  }
}
