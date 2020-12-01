import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import auth from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';
import { userInfo } from 'os';
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

  async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['professional-dashboard']);
  }

  async register(email: string, password: string) {
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
      ; (await this.afAuth.currentUser).sendEmailVerification
    this.router.navigate(['professional-dashboard']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  createUser(email, password, type, fname, lname, pronouns) {
    var self = this;
    return new Promise<any>((resolve, reject) => {
      //create new user in firebase authentication
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(function () {
          self.afAuth.signInWithEmailAndPassword(email, password)
            .then(function () {
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



}
