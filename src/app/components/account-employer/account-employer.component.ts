import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-account-employer',
  templateUrl: './account-employer.component.html',
  styleUrls: ['./account-employer.component.css']
})
export class AccountEmployerComponent implements OnInit {

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
    public authService: AuthService,
    public db: AngularFireDatabase
  ) {
    //get values already in database for user
    firebase.default.database().ref("EmployerUsers/").once('value', (snapshot) => {
      snapshot.forEach(child => {
        if (child.val().Email == this.authService.userData.email) {
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

  updateUser(fname, lname, companyname, companysize, position, phone, password, industry, headquarters, companydescription) {
    document.getElementById("updateSuccess").style.display = "none";
    const empRef = this.db.object("EmployerUsers/" + this.authService.userData.uid);
    var errorBool = false;

    if (password != "") {
      firebase.default.auth().currentUser.updatePassword(password).then(() => {
        //update successful
      }).catch((error) => {
        errorBool = true;
        if (error.code == "auth/requires-recent-login") {
          document.getElementById("needRecentLogin").style.display = "block";
        }
        if (error.code == "auth/user-token-expired") {
          document.getElementById("reLogin").style.display = "block";
        }
      });
    }

    if (!errorBool) {
      if (fname != "" && lname != "") {
        firebase.default.auth().currentUser.updateProfile({
          displayName: fname + " " + lname
        });
        empRef.update({
          Fname: fname,
          Lname: lname
        });
      } else if (lname != "") {
        empRef.update({
          Lname: lname
        });
        firebase.default.auth().currentUser.updateProfile({
          displayName: this.Fname + " " + lname
        });
      } else if (fname != "") {
        empRef.update({
          Fname: fname
        });
        firebase.default.auth().currentUser.updateProfile({
          displayName: fname + " " + this.Lname
        });
      }
      // if (email != "") {
      //   profRef.update({
      //     Email: email
      //   });
      // }
      if (companyname != "") {
        empRef.update({
          Company: companyname
        });
      }
      if (companysize != "") {
        empRef.update({
          CompanySize: companysize
        });
      }
      if (position != "") {
        empRef.update({
          Position: position
        });
      }
      if (phone != "") {
        empRef.update({
          Phone: phone
        });
      }
      if (industry != "") {
        empRef.update({
          Industry: industry
        });
      }
      if (headquarters != "") {
        empRef.update({
          Headquarters: headquarters
        });
      }
      if (phone != "") {
        empRef.update({
          CompanyDescription: companydescription
        });
      }
      document.getElementById("updateSuccess").style.display = "block";

      if (password != "") {
        this.authService.SignOut();
      }
    }
  }
}
