import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";

//Firebase imports + environment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

//Auth service import
import { AuthService } from "./services/auth.service"

//Components imports
import { SignupProfessionalComponent } from './components/signup-professional/signup-professional.component';
import { SignupEmployerComponent } from './components/signup-employer/signup-employer.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ProfessionalDashboardComponent } from './components/professional-dashboard/professional-dashboard.component';
import { EmployerDashboardComponent } from './components/employer-dashboard/employer-dashboard.component';
// import { MainSignupComponent } from './components/main-signup/main-signup.component';
import { AccountProfessionalComponent } from './components/account-professional/account-professional.component';
import { AccountEmployerComponent } from './components/account-employer/account-employer.component';
import { ShiftsAndGigsComponent } from './components/shifts-and-gigs/shifts-and-gigs.component';
import { CommunityComponent } from './components/community/community.component';
import { MentorMatchingComponent } from './components/mentor-matching/mentor-matching.component';
import { CreateJobPostComponent } from './components/create-job-post/create-job-post.component';
import { ManageActiveJobsComponent } from './components/manage-active-jobs/manage-active-jobs.component';
import { BrowseProfessionalsComponent } from './components/browse-professionals/browse-professionals.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupProfessionalComponent,
    SignupEmployerComponent,
    LoginComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ProfessionalDashboardComponent,
    EmployerDashboardComponent,
    // MainSignupComponent,
    AccountProfessionalComponent,
    AccountEmployerComponent,
    ShiftsAndGigsComponent,
    CommunityComponent,
    MentorMatchingComponent,
    CreateJobPostComponent,
    ManageActiveJobsComponent,
    BrowseProfessionalsComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [ AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
