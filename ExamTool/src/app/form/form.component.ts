import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  Image: string = '';
  ExamName: string = '';
  Subject: string = '';
  Class: string = '';
  Room: string = '';
  Supervisor: string = '';
  Date: string = '';
  Time: string = '';
}
