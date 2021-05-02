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

  constructor(private authService: AuthService, private router: Router) { }

  isActive(tabId): boolean {
    return this.tab === tabId;
  }

  openTab(tabId): void {
    this.tab = tabId;
  }

  submitMentee() {
  }

  submitMentor() {
  }

  ngOnInit() {
  }

}