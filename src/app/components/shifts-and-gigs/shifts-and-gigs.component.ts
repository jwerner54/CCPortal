import { Component, OnInit } from '@angular/core';
import { Job } from '../../services/job';
import * as firebase from 'firebase';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-shifts-and-gigs',
  templateUrl: './shifts-and-gigs.component.html',
  styleUrls: ['./shifts-and-gigs.component.css']
})
export class ShiftsAndGigsComponent implements OnInit {

  jobs: Job[];

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    var index = 0;
    this.jobs = [];
    firebase.default.database().ref("JobListings/").once('value', (snapshot) => {
      snapshot.forEach(child => {
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
      });
    }).then(() => {
    });
  }

  viewGig(uid) {
    this.authService.viewJobPage(uid);
  }

}
