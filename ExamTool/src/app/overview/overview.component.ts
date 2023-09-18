import { Component } from '@angular/core';
import { Exam, Exams } from '../../assets/placeholder_exams';
import { Account, Accounts } from '../../assets/placeholder_accounts';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  Exams = Exams;
  Accounts = Accounts;

  timeofday: string = 'Goedemorgen';
}
