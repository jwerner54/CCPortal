import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  goToMentorSignup() {
    this.authService.mentorTab = 2;
    this.authService.router.navigate(["/mentor-matching"]);
  }

  goToMenteeSignup() {
    this.authService.mentorTab = 1;
    this.authService.router.navigate(["/mentor-matching"]);
  }

}
