import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-professional-signup',
  templateUrl: './professional-signup.component.html',
  styleUrls: ['./professional-signup.component.css']
})
export class ProfessionalSignupComponent implements OnInit {

  user = {
    fname: '',
    lname: '',
    email: '',
    pronouns: '',
    password: '',
    type: 'professional'
  }

  constructor(private authService: AuthService) { }

  createUser() {
    var errors = false;
    this.authService.createUserProfessional(this.user.email, this.user.password, this.user.type, this.user.fname, this.user.lname, this.user.pronouns)
      .catch((error) => {
        if (error.code == "auth/invalid-email") {
          // this.showInvalidEmail();
        } else if (error.code == "auth/email-already-in-use") {
          // this.showExists();
        }
        errors = true;
      }).then(function () {
        if (!errors) {
          // self.showSuccess();
        }
      })
  }

  ngOnInit() {
  }

}
