import { Component } from '@angular/core';
import { Exam, Exams } from '../../assets/placeholder_exams';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  Exams = Exams;

  timeofday: string = 'Goedemorgen';
  user: string = 'geertje';
}
