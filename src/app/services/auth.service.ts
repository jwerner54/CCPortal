import { Injectable, Inject, NgZone } from '@angular/core';
import { User } from "../services/user";
import auth from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { FileService } from '../services/file.service';
import { finalize } from 'rxjs/operators';
import { Job } from '../services/job';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;
  professionalslDb: Observable<any>;
  employersDb: Observable<any>;
  job: Job;
  mentorTab: any;
  // userType: String;

  constructor(
    public db: AngularFireDatabase,   // Inject Firebase Realtime Database service
    public storage: AngularFireStorage,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });

    this.professionalslDb = db.object('ProfessionalUsers').valueChanges();
    this.employersDb = db.object('EmployerUsers').valueChanges();
  }

  viewJobPage(jobUid) {
    this.job = new Job;
    firebase.default.database().ref("JobListings/").once('value', (snapshot) => {
      snapshot.forEach(child => {
        if (child.key == jobUid) {
          this.job.position = child.val().Position;
          this.job.description = child.val().Description;
          this.job.experience = child.val().Experience;
          this.job.location = child.val().Location;
          this.job.contact = child.val().Contact;
          this.job.company = child.val().Company;
          this.job.uid = child.key;
          this.job.employerid = child.val().EmployerID;
        }
      });
    }).then(() => {
      localStorage.setItem('job', JSON.stringify(this.job));
      JSON.parse(localStorage.getItem('job'));
      this.router.navigate(['job-view']);
    });
  }

  deleteEmployer() {
    var jobIds = [""];
    var index = 0;
    const empRef = this.db.object("EmployerUsers/" + this.userData.uid);
    firebase.default.database().ref("EmployerUsers/" + this.userData.uid + "/JobPosts").once('value', (snapshot) => {
      snapshot.forEach(child => {
        if (index == 0) {
          jobIds[0] = child.key;
          index = index + 1;
        } else {
          jobIds.push(child.key);
        }
      });
    }).then(() => {
      firebase.default.database().ref("JobListings/").once('value', (snapshot) => {
        snapshot.forEach(child => {
          if (jobIds.indexOf(child.key) != -1) {
            child.ref.remove();
          }
        });
      }).then(() => {
        empRef.remove().then(() => {
          firebase.default.auth().currentUser.delete().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
          }).catch((error) => {
            if(error.code == "auth/requires-recent-login") {
              document.getElementById("needRecentLoginDelete").style.display = "block";
            }
          });
        });
      });
    });
  }

  deleteProfessional() {
    const profRef = this.db.object("ProfessionalUsers/" + this.userData.uid);
    profRef.remove().then(() => {
      firebase.default.auth().currentUser.delete().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      }).catch((error) => {
        if(error.code == "auth/requires-recent-login") {
          document.getElementById("needRecentLoginDelete").style.display = "block";
        }
      });
    });
  }


  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firebase Realtime Database */
  SetUserData(user) {

  }

  SetJob(jobUid) {
    this.job = new Job;
    firebase.default.database().ref("JobListings/").once('value', (snapshot) => {
      snapshot.forEach(child => {
        if (child.key == jobUid) {
          this.job.position = child.val().Position;
          this.job.description = child.val().Description;
          this.job.experience = child.val().Experience;
          this.job.location = child.val().Location;
          this.job.contact = child.val().Contact;
          this.job.company = child.val().Company;
          this.job.uid = child.key;
          this.job.employerid = child.val().EmployerID;
        }
      });
    }).then(() => {
    });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      })
  }

  // Send email verfificaiton when new user sign up
  ResendVerificationMail() {
    document.getElementById("tooManyRequests").style.display = "none";
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        document.getElementById("resendBtn").style.display = "none";
        document.getElementById("resendText").style.display = "block";
      }).catch((error) => {
        if (error.code == "auth/too-many-requests") {
          document.getElementById("tooManyRequests").style.display = "block";
        }
      });
  }

  // Sign in with email/password
  SignIn(email, password) {
    //reset error notifications when login button is pressed
    document.getElementById("noEmail").style.display = "none";
    document.getElementById("wrongPassword").style.display = "none";
    document.getElementById("notVerified").style.display = "none";

    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        //make sure user has verified their email before logging in
        if (!result.user.emailVerified) {
          document.getElementById("notVerified").style.display = "block";
        } else {
          this.ngZone.run(() => {
            //check if the user is a professional or an employer
            firebase.default.database().ref('EmployerUsers/' + result.user.uid).once("value", snapshotChanges => {
              if (snapshotChanges.exists()) {
                this.navigateEmployer();
              } else {
                this.navigateProfessional();
              }
            });
          });
        }
      }).catch((error) => {
        if (error.code == "auth/user-not-found" || error.code == "auth/invalid-email") {
          document.getElementById("noEmail").style.display = "block";
        }
        if (error.code == "auth/wrong-password") {
          document.getElementById("wrongPassword").style.display = "block";
        }
        if (error.code == "auth/too-many-requests") {
          document.getElementById("tooManyRequests").style.display = "block";
        }
      });
  }

  navigateEmployer() {
    this.ngZone.run(() => {
      this.router.navigate(["employer-dashboard"]);
    });
  }

  navigateProfessional() {
    this.ngZone.run(() => {
      this.router.navigate(["professional-dashboard"]);
    });
  }

  // Sign up with email/password
  SignUpEmployer(email, password, fname, lname, companyname, position, phone, companysize, industry, headquarters, companydescription) {
    document.getElementById("emailExists").style.display = "none";
    document.getElementById("invalidEmail").style.display = "none";
    document.getElementById("weakPassword").style.display = "none";
    document.getElementById("wrongFname").style.display = "none";
    document.getElementById("wrongLname").style.display = "none";

    if (fname == "") {
      document.getElementById("wrongFname").style.display = "block";
    } else if (lname == "") {
      document.getElementById("wrongLname").style.display = "block";
    } else {
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          /* Call the SendVerificaitonMail() function when new user sign 
          up and returns promise */
          //set displayName to be user's full name
          result.user.updateProfile({
            displayName: fname + " " + lname
          });

          //store user info in firebase
          const empRef = this.db.object("EmployerUsers/" + result.user.uid);
          empRef.set({
            Email: email,
            Fname: fname,
            Lname: lname,
            Company: companyname,
            CompanySize: companysize,
            Position: position,
            Phone: phone,
            Industry: industry,
            Headquarters: headquarters,
            CompanyDescription: companydescription
          });

          this.SendVerificationMail();
          this.SetUserData(result.user);
        }).catch((error) => {
          if (error.code == "auth/email-already-in-use") {
            document.getElementById("emailExists").style.display = "block";
          }
          if (error.code == "auth/invalid-email") {
            document.getElementById("invalidEmail").style.display = "block";
          }
          if (error.code == "auth/weak-password") {
            document.getElementById("weakPassword").style.display = "block";
          }
        });
    }
  }

  // Sign up with email/password -professionals
  SignUpProfessional(email, password, fname, lname, pronouns) {
    document.getElementById("emailExists").style.display = "none";
    document.getElementById("invalidEmail").style.display = "none";
    document.getElementById("weakPassword").style.display = "none";
    document.getElementById("wrongFname").style.display = "none";
    document.getElementById("wrongLname").style.display = "none";

    if (fname == "") {
      document.getElementById("wrongFname").style.display = "block";
    } else if (lname == "") {
      document.getElementById("wrongLname").style.display = "block";
    } else {
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          /* Call the SendVerificaitonMail() function when new user sign 
          up and returns promise */
          //set displayName to be user's full name
          result.user.updateProfile({
            displayName: fname + " " + lname
          });

          //store user info in firebase
          const profRef = this.db.object("ProfessionalUsers/" + result.user.uid);
          profRef.set({
            Email: email,
            Fname: fname,
            Lname: lname,
            Pronouns: pronouns
          });
          const profMentorRef = this.db.object("ProfessionalUsers/" + result.user.uid + "/MentorApplication");
          profMentorRef.set({
            Applied: false
          });

          //store resume file in firebase storage
          // this.saveFile(filename, file, id);

          this.SendVerificationMail();
          this.SetUserData(result.user);
        }).catch((error) => {
          if (error.code == "auth/email-already-in-use") {
            document.getElementById("emailExists").style.display = "block";
          }
          if (error.code == "auth/invalid-email") {
            document.getElementById("invalidEmail").style.display = "block";
          }
          if (error.code == "auth/weak-password") {
            document.getElementById("weakPassword").style.display = "block";
          }
        });
    }
  }

  // saveFile(filename, file, id) {
  //   console.log(file);
  //   console.log(id);
  //   const fileRef = this.storage.ref(filename);
  //   this.storage.upload(filename, file).snapshotChanges().pipe(
  //     finalize(() => {
  //       console.log("finalize ran");
  //       fileRef.getDownloadURL().subscribe((url) => {
  //         console.log("get download url ran");
  //         console.log(url);
  //         this.fileService.insertFileDetails(id, url);
  //         alert('Upload Successful');
  //       })
  //     })
  //   ).subscribe();
  // }


  // save() {
  //   var name = this.selectedImage.name;
  //   const fileRef = this.storage.ref(name);
  //   this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
  //     finalize(() => {
  //       fileRef.getDownloadURL().subscribe((url) => {
  //         this.url = url;
  //         this.fileService.insertImageDetails(this.id,url);
  //         alert('Upload Successful');
  //       })
  //     })
  //   ).subscribe();
  // }

  viewFile() {
    // this.fileService.getFile(this.file);
    console.log("viewFile ran");
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    document.getElementById("resetBtn").style.display = "none";
    document.getElementById("message").style.display = "none";
    document.getElementById("notFound").style.display = "none";

    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        document.getElementById("message").style.display = "block";
        document.getElementById("resetBtn").style.display = "none";
      }).catch((error) => {
        if (error.code == "auth/user-not-found" || error.code == "auth/invalid-email") {
          document.getElementById("notFound").style.display = "block";
        }
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

}
