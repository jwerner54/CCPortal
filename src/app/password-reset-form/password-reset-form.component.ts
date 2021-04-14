import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import auth from 'firebase';



@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.css']
})
export class PasswordResetFormComponent implements OnInit {

  user = {
    email: '',
  }

  constructor(private authService: AuthService) { }

  sendResetLink() {
    var self = this;
    auth.auth().fetchSignInMethodsForEmail(self.user.email)
      .then(function (signInMethods) {
        if (signInMethods.length < 1) {
          document.getElementById("notFound").style.display = "block";
        } else {
          self.authService.sendPasswordResetEmail(self.user.email);
          self.displayMessage();
        }
      });
  }

  displayMessage() {
    document.getElementById("message").style.display = "block";
    document.getElementById("resetForm").style.display = "none";
  }

  ngOnInit() {
  }

}
