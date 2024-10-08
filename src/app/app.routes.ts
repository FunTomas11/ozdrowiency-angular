import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {AnswerDetailsComponent} from "./components/answer-details/answer-details.component";

export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'answers/:answerId', component: AnswerDetailsComponent, canActivate: [AuthGuard]},
  {path: 'landing', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: ''}
];
