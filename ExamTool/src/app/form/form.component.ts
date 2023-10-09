import { Component } from '@angular/core';
import { Exam, Exams } from '../../assets/placeholder_exams';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  Exams = Exams;

  Image: string = '';
  ExamName: string = '';
  Subject: string = '';
  Class: string = '';
  Room: string = '';
  Supervisor: string = '';
  Date: string = '';
  Time: string = '';

  constructor() {}
}
