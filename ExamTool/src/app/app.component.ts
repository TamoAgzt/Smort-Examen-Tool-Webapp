import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Statics } from './Statics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  staticData: typeof Statics = Statics;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (!(val instanceof NavigationEnd)) {
        return;
      }
      this.onLoginPage =
        router.url == '/login' || router.url == '/registration';
      this.onCalendarPage = router.url == '/calendar';

      this.addingExam = router.url == '/form';
    });

    this.checkLocalStorage();
  }

  title = 'ExamTool';

  onLoginPage: boolean = false;
  addingExam: boolean = false;

  Hamburger: boolean = false;
  onCalendarPage: boolean = false;
  addingRol: boolean = false;

  checkLocalStorage() {
    this.addingRol =
      window.localStorage.getItem('Vista.Examen.Rol.Planner') == '3';
    console.log(this.addingRol);
  }

  toggleOverview() {
    if (this.onCalendarPage) {
      this.router.navigate(['/calendar']);
    }
    if (!this.onCalendarPage) {
      this.router.navigate(['/overview']);
    }
  }

  ToggleHamburger() {
    this.Hamburger = !this.Hamburger;
  }

  Logout() {
    window.localStorage.setItem('Vista.Examen.Token.Planner', '');
    window.localStorage.setItem('Vista.Examen.Rol.Planner', '');
    Statics.Token = '';
    Statics.Rol = '';
  }
}
