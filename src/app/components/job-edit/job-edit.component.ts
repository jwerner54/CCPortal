import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public db: AngularFireDatabase
  ) { }

  ngOnInit(): void {
  }

  editJobPost(position, description, experience, location, contact) {
    const jobRef = this.db.object("JobListings/" + this.authService.job.uid);

    if (position != "") {
      jobRef.update({
        Position: position
      });
    }
    if (description != this.authService.job.description) {
      jobRef.update({
        Description: description
      });
    }
    if (experience != "") {
      jobRef.update({
        Experience: experience
      });
    }
    if (location != "") {
      jobRef.update({
        Location: location
      });
    }
    if (contact != "") {
      jobRef.update({
        Contact: contact
      });
    }
      // document.getElementById("postForm").style.display = "none";
      document.getElementById("successMsg").style.display = "block";
  }

  deleteJobPost() {
    const jobRef = this.db.object("JobListings/" + this.authService.job.uid);
    const empJobRef = this.db.object("EmployerUsers/" + this.authService.userData.uid + "/JobPosts/" + this.authService.job.uid);
    jobRef.remove().then(() => {
      empJobRef.remove();
      document.getElementById("confirmDeleteBtn").style.display = "none";
      document.getElementById("deleteConfirm").style.display = "none";
      document.getElementById("postForm").style.display = "none";
      document.getElementById("deleteSuccess").style.display = "block";
    });
  }

  confirmDelete() {
    document.getElementById("deleteBtn").style.display = "none";
    document.getElementById("confirmDeleteBtn").style.display = "inline-block";
    document.getElementById("deleteConfirm").style.display = "block";

  }

}
