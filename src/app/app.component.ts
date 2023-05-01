import { Component, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mf-reportsgds';
  @HostListener('window:message', ['$event'])
  async onMessage(e: any) {
    let accessDomain = [environment.domDashboard, environment.domHostNameDashboard]
    /* if (e.origin != environment.domDashboard) { */
    if (!accessDomain.includes(e.origin)) {
      return false;
    } else {
      if (e.data) {
        let dataParsed = JSON.parse(JSON.stringify(e.data))
        if (dataParsed.logout) {
          localStorage.clear()
          return
        }

        localStorage.clear()
        const objectRetrieved = localStorage.getItem('localstorage');
        const objectToken = localStorage.getItem("bearer");
        if (!objectRetrieved && !objectToken) {
          localStorage.clear()
          localStorage.setItem("localstorage", JSON.stringify(e.data));
          const objectRetrievedLS = localStorage.getItem('localstorage') ?? '';
          const bearer = JSON.parse(objectRetrievedLS).tokenBearer

          localStorage.setItem("bearer", bearer);
          localStorage.setItem("user", e.data.user);
          window.location.reload();
        }
      } else {
        localStorage.clear()
      }
      return true;
    }
  }
}
