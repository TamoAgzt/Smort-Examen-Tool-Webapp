import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (!(val instanceof NavigationEnd)) {
        return;
      }
      this.onLoginPage =
        router.url == '/login' || router.url == '/registration';
      this.onCalendarPage = router.url == '/calendar';
    });
  }

  title = 'ExamTool';

  onLoginPage: boolean = false;
  // hamburgerMenu: HTMLElement = document.getElementById('hamburgerMenu');

  Hamburger: boolean = false;
  onCalendarPage: boolean = false;

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

  //#region Development helper stuff
  developmentNavigator = false;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key != 'ArrowDown') {
      return;
    }

    this.developmentNavigator = !this.developmentNavigator;
  }
  //#endregion
}
