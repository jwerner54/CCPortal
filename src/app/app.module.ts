import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
      LoginComponent
   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: DashboardComponent},
      {path: 'main-signup', component: MainSignupComponent},
      {path: 'professional-dashboard', component: ProfessionalDashboardComponent},
      {path: 'employer-dashboard', component: EmployerDashboardComponent},
      {path: 'professional-signup', component: ProfessionalSignupComponent},
      {path: 'employer-signup', component: EmployerSignupComponent},
      {path: 'shifts-and-gigs', component: ShiftsAndGigsComponent},
      {path: 'mentor-matching', component: MentorMatchingComponent},
      {path: 'browse-professionals', component: BrowseProfessionalsComponent},
      {path: 'community', component: CommunityComponent},
      {path: 'login', component: LoginComponent},

    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
