import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employer-signup',
  templateUrl: './employer-signup.component.html',
  styleUrls: ['./employer-signup.component.css']
})
export class EmployerSignupComponent implements OnInit {

  user = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    companyname: '',
    position: '',
    companysize: '',
    phone: '',
    type: 'employer'
  }

  constructor(private authService: AuthService, private router: Router) { }

  createUser() {
    var errors = false;
    this.authService.createUserEmployer(this.user.email, this.user.password, this.user.type, this.user.fname, this.user.lname, 
      this.user.companyname, this.user.companysize, this.user.position, this.user.phone)
      .catch((error) => {
        this.showError();
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
      });
      this.router.navigate(['employer-dashboard']);
  }

  showError() {
    document.getElementById("errorMsg").style.display = "block";
  }

  ngOnInit() {
  }

}
