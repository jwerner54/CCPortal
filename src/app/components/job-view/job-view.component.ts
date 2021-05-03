import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import * as firebase from 'firebase';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css']
})
export class JobViewComponent implements OnInit {

  Fname: String;
  Lname: String;
  Email: String;
  CompanyName: String;
  CompanySize: String;
  Position: String;
  Phone: String;
  Industry: String;
  Headquarters: String;
  CompanyDescription: String;

  constructor(
    public authService: AuthService
  ) {
    firebase.default.database().ref("EmployerUsers/").once('value', (snapshot) => {
      snapshot.forEach(child => {
        if (child.key == this.authService.job.employerid) {
          this.Fname = child.val().Fname;
          this.Lname = child.val().Lname;
          this.Email = child.val().Email;
          this.CompanyName = child.val().Company;
          this.CompanySize = child.val().CompanySize;
          this.Position = child.val().Position;
          this.Phone = child.val().Phone;
          this.Industry = child.val().Industry;
          this.Headquarters = child.val().Headquarters;
          this.CompanyDescription = child.val().CompanyDescription;
        }
      });
    }).then(() => {
    });
   }

  ngOnInit(): void {
  }

}
