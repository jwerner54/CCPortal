import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import auth from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: auth.User;
  items: Observable<any>;

  constructor(public afAuth: AngularFireAuth, public router: Router, public db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })

    this.items = db.object('User').valueChanges();
  }

  //login user with given credentials
  async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['professional-dashboard']);
  }

  // async register(email: string, password: string) {
  //   var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
  //     ; (await this.afAuth.currentUser).sendEmailVerification
  //   this.router.navigate(['professional-dashboard']);
  // }

  //Send email to current user with password reset link
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  //Logout the user
  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  //Check if user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  //returns the username of the user
  getDisplayName() {
    if (this.afAuth.currentUser != null) {
      return this.afAuth.currentUser;
    }
  }

  createUserProfessional(email, password, type, fname, lname, pronouns) {
    var self = this;
    return new Promise<any>((resolve, reject) => {
      //create new user in firebase authentication
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(function () {
          //After creation of account, log the user in
          self.afAuth.signInWithEmailAndPassword(email, password)
            .then(function () {
              //update database values with user's information
              firebase.default.database().ref('Users/' + fname + lname).set({
                UserType: type,
                Fname: fname,
                Lname: lname,
                Pronouns: pronouns,
                UID: firebase.default.auth().currentUser.uid
              })
            })
        })
    })
  }

  createUserEmployer(email, password, type, fname, lname, companyname, companysize, position, phone) {
    var self = this;
    return new Promise<any>((resolve, reject) => {
      //create new user in firebase authentication
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(function () {
          //After creation of account, log the user in
          self.afAuth.signInWithEmailAndPassword(email, password)
            .then(function () {
              //update database values with user's information
              firebase.default.database().ref('Jobs/' + companyname).set({
                UserType: type,
                Fname: fname,
                Lname: lname,
                Company: companyname,
                CompanySize: companysize,
                Position: position,
                Phone: phone,
                UID: firebase.default.auth().currentUser.uid
              })
            })
        })
    })
  }



}
