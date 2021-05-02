import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-signup-employer',
  templateUrl: './signup-employer.component.html',
  styleUrls: ['./signup-employer.component.css']
})
export class SignupEmployerComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
