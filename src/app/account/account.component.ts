import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user = {
    fname: '',
    lname: '',
    email: '',
    pronouns: '',
    password: '',
    type: 'professional'
  }
  
  constructor(private auth: AuthService,  public db: AngularFireDatabase) { }

  ngOnInit() {
  }

  // public getDisplayName() {
  //   return this.auth.getDisplayName();
  // }

  updateDb() {
    firebase.default.database().ref('Users/' + this.user.fname + this.user.lname).set({
      Fname: this.user.fname,
      Lname: this.user.lname,
      Pronouns: this.user.pronouns,
      UID: firebase.default.auth().currentUser.uid
    })
  }

  logout() {
    this.auth.logout();
  }
}
