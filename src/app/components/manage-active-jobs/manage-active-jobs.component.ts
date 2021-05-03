import { Component, OnInit } from '@angular/core';
import { Job } from '../../services/job';
import * as firebase from 'firebase';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-manage-active-jobs',
  templateUrl: './manage-active-jobs.component.html',
  styleUrls: ['./manage-active-jobs.component.css']
})
export class ManageActiveJobsComponent implements OnInit {

  jobs: Job[];
  jobPosts: [String];
  userID: String;

  constructor(
    public authService: AuthService
  ) {
    this.jobPosts = [""];
    firebase.default.database().ref("EmployerUsers/").once('value', (snapshot) => {
      snapshot.forEach(child => {
        if (child.val().Email == this.authService.userData.email) {
          this.userID = child.key;
        }
      });
    }).then(() => {
      var index = 0;
      firebase.default.database().ref("EmployerUsers/" + this.userID + "/JobPosts").once('value', (snapshot) => {
        snapshot.forEach(child => {
          if (index == 0) {
            this.jobPosts[0] = child.key;
            index = 1;
          } else {
            this.jobPosts.push(child.key);
          }
        });
      }).then(() => {
        var index = 0;
        this.jobs = [];
        firebase.default.database().ref("JobListings/").once('value', (snapshot) => {
          snapshot.forEach(child => {
            if (this.jobPosts.indexOf(child.key) != -1) {
              var job = new Job();
              job.position = child.val().Position;
              job.description = child.val().Description;
              job.experience = child.val().Experience;
              job.location = child.val().Location;
              job.contact = child.val().Contact;
              job.company = child.val().Company;
              job.uid = child.key;
              this.jobs[index] = job;
              index = index + 1;
            }
          });
        }).then(() => {
        });
      });
    });
  }

  ngOnInit(): void {
  }

  editGig(uid) {
    this.authService.SetJob(uid);
    this.authService.router.navigate(["/job-edit"]);
  }

}
