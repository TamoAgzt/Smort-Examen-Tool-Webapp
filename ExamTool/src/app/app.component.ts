import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor (private router:Router) {
    router.events.subscribe((val) => {
      if (!(val instanceof NavigationEnd)) { return; }
      this.onLoginPage = router.url == '/login';
    });
  };

  title = 'ExamTool';

  //#region Development helper stuff
  developmentNavigator = true;
  onLoginPage:boolean = false;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key != 'ArrowDown') { return; }

    this.developmentNavigator = !this.developmentNavigator;
    console.log(this.developmentNavigator);
  }
}
