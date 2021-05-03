import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-account-professional',
  templateUrl: './account-professional.component.html',
  styleUrls: ['./account-professional.component.css']
})
export class AccountProfessionalComponent implements OnInit {

  Fname: String;
  Lname: String;
  Email: String;
  Pronouns: String;

  constructor(
    public authService: AuthService,
    public db: AngularFireDatabase
  ) {
    //get values already in database for user
    firebase.default.database().ref("ProfessionalUsers/").once('value', (snapshot) => {
      snapshot.forEach(child => {
        if (child.val().Email == this.authService.userData.email) {
          this.Fname = child.val().Fname;
          this.Lname = child.val().Lname;
          this.Pronouns = child.val().Pronouns;
          this.Email = child.val().Email;
        }
      });
    }).then(() => {
    });
  }

  ngOnInit(): void {
  }

  updateUser(fname, lname, pronouns, password) {
    document.getElementById("updateSuccess").style.display = "none";
    const profRef = this.db.object("ProfessionalUsers/" + this.authService.userData.uid);
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
        profRef.update({
          Fname: fname,
          Lname: lname
        });
      } else if (lname != "") {
        profRef.update({
          Lname: lname
        });
        firebase.default.auth().currentUser.updateProfile({
          displayName: this.Fname + " " + lname
        });
      } else if (fname != "") {
        profRef.update({
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
      if (pronouns != "") {
        profRef.update({
          Pronouns: pronouns
        });
      }
      // document.getElementById("updateForm").style.display = "none";
      document.getElementById("updateSuccess").style.display = "block";

      if (password != "") {
        this.authService.SignOut();
      }
    }
  }

}
