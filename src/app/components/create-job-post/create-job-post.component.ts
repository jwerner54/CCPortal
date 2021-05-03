import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-job-post',
  templateUrl: './create-job-post.component.html',
  styleUrls: ['./create-job-post.component.css']
})
export class CreateJobPostComponent implements OnInit {

  Company: String;
  EmployerID: String;

  constructor(
    public authService: AuthService,
    public db: AngularFireDatabase
  ) { }

  ngOnInit(): void {

  }

  createJobPost(position, description, experience, location, contact) {
    const jobId = uuid.v4();
    //get values already in database for user
    firebase.default.database().ref("EmployerUsers/").once('value', (snapshot) => {
      snapshot.forEach(child => {
        if (child.val().Email == this.authService.userData.email) {
          this.Company = child.val().Company;
          this.EmployerID = child.key;
        }
      });
    }).then(() => {
      const jobRef = this.db.object("JobListings/" + jobId);
      jobRef.set({
        Position: position,
        Description: description,
        Experience: experience,
        Location: location,
        Contact: contact,
        Company: this.Company,
        EmployerID: this.EmployerID
      });
      var updates = {};
      updates['/JobPosts/' + jobId] = position;
      this.db.object("EmployerUsers/" + this.authService.userData.uid).update(updates);
      document.getElementById("postForm").style.display = "none";
      document.getElementById("successMsg").style.display = "block";
    });
  }

  //TODO: add company logo upload function

}