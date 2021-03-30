import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  items: Array<any> = null;

  user = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router, private location: Location) {
    // this.authService.db.database.ref("Users").valueChanges()
    // .subscribe(result => {
    //   this.items = result;
    // });
  }

  login() {
    // document.getElementById("errorMsg").style.display = "none";
    // var email = null;
    // if (this.items != null) {
    //   var self = this;
    //   var userdb = this.items.find(function (element) {
    //     return element.name == self.user.username;
    //   });
    // }

    this.authService.login(this.user.email, this.user.password).then((res) => {
      // if(this.authService.isLoggedIn) {
      //   console.log("Here");
      //   this.router.navigate(['professional-dashboard']);
      // } else {
      //   console.log("not logged in");
      // }
      this.location.replaceState('/');
      this.router.navigate(["professional-dashboard"]);
    }).catch((err) => {
      this.showError();
    });
  }

  showError() {
    document.getElementById("errorMsg").style.display = "block";
  }

  ngOnInit() {
  }

}
