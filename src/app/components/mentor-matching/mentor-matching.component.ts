import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-mentor-matching',
  templateUrl: './mentor-matching.component.html',
  styleUrls: ['./mentor-matching.component.css']
})
export class MentorMatchingComponent implements OnInit {
  tab = 1;

  mentee = {
    fname: '',
    lname: '',
    email: '',
    birthday: '',
    phone: '',
    type: 'mentee',
    industry: '',
    areasofimpact: []
  }

  mentor = {
    fname: '',
    lname: '',
    email: '',
    birthday: '',
    experience: '',
    mentorexp: '',
    phone: '',
    industry: '',
    type: 'mentor'
  }

  constructor(
    private authService: AuthService,
    public db: AngularFireDatabase
  ) { }

  isActive(tabId): boolean {
    return this.tab === tabId;
  }

  openTab(tabId): void {
    if (tabId == 1) {
      document.getElementById("Mentee").style.display = "block";
      document.getElementById("btn1").classList.add("active");
      document.getElementById("Mentor").style.display = "none";
      document.getElementById("btn2").classList.remove("active");
      document.getElementById("alreadyApplied").style.display = "none";

    } else {
      document.getElementById("Mentee").style.display = "none";
      document.getElementById("btn1").classList.remove("active");
      document.getElementById("Mentor").style.display = "block";
      document.getElementById("btn2").classList.add("active");
      document.getElementById("alreadyAppliedMentor").style.display = "none";
    }
  }

  submitMentee() {
    firebase.default.database().ref("ProfessionalUsers/" + this.authService.userData.uid + "/MentorApplication").once('value', (snapshot) => {
      snapshot.forEach(child => {
        if (child.key == "Applied" && child.val() == false) {
          const mentorRef = this.db.object("ProfessionalUsers/" + this.authService.userData.uid + "/MentorApplication");
          mentorRef.set({
            Birthday: this.mentee.birthday,
            Phone: this.mentee.phone,
            Industry: this.mentee.industry,
            Applied: true
          });
          document.getElementById("formsDiv").style.display = "none";
          document.getElementById("successMsg").style.display = "block";
        } else {
          document.getElementById("alreadyApplied").style.display = "block";
        }
      });
    });
  }

  submitMentor() {
    firebase.default.database().ref("ProfessionalUsers/" + this.authService.userData.uid + "/MentorApplication").once('value', (snapshot) => {
      snapshot.forEach(child => {
        if (child.key == "Applied" && child.val() == false) {
          const mentorRef = this.db.object("ProfessionalUsers/" + this.authService.userData.uid + "/MentorApplication");
          mentorRef.set({
            Birthday: this.mentor.birthday,
            Phone: this.mentor.phone,
            Industry: this.mentor.industry,
            Applied: true,
            Experience: this.mentor.experience,
            MentoredBefore: this.mentor.mentorexp
          });
          document.getElementById("formsDiv").style.display = "none";
          document.getElementById("successMsg").style.display = "block";
        } else {
          document.getElementById("alreadyAppliedMentor").style.display = "block";
        }
      });
    });
  }

  ngOnInit() {
    document.getElementById("Mentee").style.display = "block";
  }

}