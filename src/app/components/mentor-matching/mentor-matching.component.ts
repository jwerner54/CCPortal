import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    type: 'mentee'
  }

  mentor = {
    fname: '',
    lname: '',
    email: '',
    birthday: '',
    mentorexp: '',
    experience: '',
    phone: '',
    type: 'mentor'
  }

  constructor(
    private authService: AuthService,
    private router: Router
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

    } else {
      document.getElementById("Mentee").style.display = "none";
      document.getElementById("btn1").classList.remove("active");
      document.getElementById("Mentor").style.display = "block";
      document.getElementById("btn2").classList.add("active");
    }
  }

  submitMentee() {
  }

  submitMentor() {
  }

  ngOnInit() {
    document.getElementById("Mentee").style.display = "block";
  }

}