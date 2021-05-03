import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//AuthGuard import
import { AuthGuard } from "./services/auth.guard";

//Components imports
import { SignupProfessionalComponent } from './components/signup-professional/signup-professional.component';
import { SignupEmployerComponent } from './components/signup-employer/signup-employer.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ProfessionalDashboardComponent } from './components/professional-dashboard/professional-dashboard.component';
import { EmployerDashboardComponent } from './components/employer-dashboard/employer-dashboard.component';
import { AccountEmployerComponent } from './components/account-employer/account-employer.component';
import { AccountProfessionalComponent } from './components/account-professional/account-professional.component';
import { CommunityComponent } from './components/community/community.component';
import { MentorMatchingComponent } from './components/mentor-matching/mentor-matching.component';
import { ShiftsAndGigsComponent } from './components/shifts-and-gigs/shifts-and-gigs.component';
import { BrowseProfessionalsComponent } from './components/browse-professionals/browse-professionals.component';
import { CreateJobPostComponent } from './components/create-job-post/create-job-post.component';
import { ManageActiveJobsComponent } from './components/manage-active-jobs/manage-active-jobs.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { JobViewComponent } from './components/job-view/job-view.component';


const routes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'about-us', component: AboutUsComponent },  
  { path: 'account-employer', component: AccountEmployerComponent, canActivate: [AuthGuard] },  
  { path: 'account-professional', component: AccountProfessionalComponent, canActivate: [AuthGuard] },  
  { path: 'browse-professionals', component: BrowseProfessionalsComponent, canActivate: [AuthGuard] },  
  { path: 'community', component: CommunityComponent, canActivate: [AuthGuard] },  
  { path: 'create-job-post', component: CreateJobPostComponent, canActivate: [AuthGuard] },  
  { path: 'employer-dashboard', component: EmployerDashboardComponent, canActivate: [AuthGuard] },  
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'job-view', component: JobViewComponent, canActivate: [AuthGuard] },  
  { path: 'login', component: LoginComponent },
  { path: 'manage-active-jobs', component: ManageActiveJobsComponent, canActivate: [AuthGuard] },  
  { path: 'mentor-matching', component: MentorMatchingComponent, canActivate: [AuthGuard] },  
  { path: 'professional-dashboard', component: ProfessionalDashboardComponent, canActivate: [AuthGuard] },  
  { path: 'shifts-and-gigs', component: ShiftsAndGigsComponent, canActivate: [AuthGuard] },  
  { path: 'signup-employer', component: SignupEmployerComponent },
  { path: 'signup-professional', component: SignupProfessionalComponent },
  { path: 'verify-email', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
