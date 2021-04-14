import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { MainSignupComponent } from './main-signup/main-signup.component';

import {RouterModule} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfessionalDashboardComponent } from './professional-dashboard/professional-dashboard.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { ProfessionalSignupComponent } from './professional-signup/professional-signup.component';
import { EmployerSignupComponent } from './employer-signup/employer-signup.component';
import { ShiftsAndGigsComponent } from './shifts-and-gigs/shifts-and-gigs.component';
import { MentorMatchingComponent } from './mentor-matching/mentor-matching.component';
import { BrowseProfessionalsComponent } from './browse-professionals/browse-professionals.component';
import { CommunityComponent } from './community/community.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BlogComponent } from './blog/blog.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { ManageActiveJobsComponent } from './manage-active-jobs/manage-active-jobs.component';
import { CreateJobPostComponent } from './create-job-post/create-job-post.component';
import { PasswordResetFormComponent } from './password-reset-form/password-reset-form.component';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_sX7iOsXhlUzeDKE53VnswbiaFIDI62g",
  authDomain: "colorful-connection.firebaseapp.com",
  databaseURL: "https://colorful-connection.firebaseio.com",
  projectId: "colorful-connection",
  storageBucket: "colorful-connection.appspot.com",
  messagingSenderId: "1010188696155",
  appId: "1:1010188696155:web:1d3b022141c3dc843edd7e",
  measurementId: "G-Z43QWJESJ2"
};

@NgModule({
  declarations: [																														
    AppComponent,
      MainSignupComponent,
      DashboardComponent,
      ProfessionalDashboardComponent,
      EmployerDashboardComponent,
      ProfessionalSignupComponent,
      EmployerSignupComponent,
      ShiftsAndGigsComponent,
      MentorMatchingComponent,
      BrowseProfessionalsComponent,
      CommunityComponent,
      LoginComponent,
      AccountComponent,
      AboutUsComponent,
      BlogComponent,
      VerifyEmailComponent,
      ManageActiveJobsComponent,
      CreateJobPostComponent,
      PasswordResetFormComponent
   ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'tempdash', component: DashboardComponent},
      {path: '', component: MainSignupComponent},
      {path: 'professional-dashboard', component: ProfessionalDashboardComponent, canActivate: [AuthGuardService]},
      {path: 'employer-dashboard', component: EmployerDashboardComponent, canActivate: [AuthGuardService]},
      {path: 'professional-signup', component: ProfessionalSignupComponent},
      {path: 'employer-signup', component: EmployerSignupComponent},
      {path: 'shifts-and-gigs', component: ShiftsAndGigsComponent, canActivate: [AuthGuardService]},
      {path: 'mentor-matching', component: MentorMatchingComponent, canActivate: [AuthGuardService]},
      {path: 'browse-professionals', component: BrowseProfessionalsComponent, canActivate: [AuthGuardService]},
      {path: 'community', component: CommunityComponent, canActivate: [AuthGuardService]},
      {path: 'login', component: LoginComponent},
      {path: 'account', component: AccountComponent, canActivate: [AuthGuardService]},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'blog', component: BlogComponent},
      {path: 'verify-email', component: VerifyEmailComponent, canActivate: [AuthGuardService]},
      {path: 'manage-active-jobs', component: ManageActiveJobsComponent, canActivate: [AuthGuardService]},
      {path: 'create-job-post', component: CreateJobPostComponent, canActivate: [AuthGuardService]},
      {path: 'password-reset-form', component: PasswordResetFormComponent},

    ]),
  ],
  providers: [AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
