import { Component, NgZone } from '@angular/core';
import { AuthService } from "../app/services/auth.service";
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CCPortal';

  constructor(
    public authService: AuthService,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { }

  //TODO: implement goHome function for both professionals and employers
  goHome() {
    if (!this.authService.isLoggedIn) {
      this.authService.router.navigate(["/login"]);
    } else {
      firebase.default.database().ref('EmployerUsers/' + this.authService.userData.uid).once("value", snapshotChanges => {
        if (snapshotChanges.exists()) {
          this.ngZone.run(() => {
            this.authService.router.navigate(["/employer-dashboard"]);
          });
        } else {
          this.ngZone.run(() => {
            this.authService.router.navigate(["/professional-dashboard"]);
          });
        }
      });
    }
  }

}

