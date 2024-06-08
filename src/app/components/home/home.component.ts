import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "firebase/auth";
import {UserService} from "../../services/user.service";
import {GenericUser, UserRole} from "../../models/user.model";
import {PatientComponent} from "../patient/patient.component";
import {DoctorComponent} from "../doctor/doctor.component";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DoctorComponent,
    PatientComponent,
    AsyncPipe,
    MatProgressSpinner
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly UserRole = UserRole;

  get user(): Observable<GenericUser> {
    return this._user;
  }

  private _user!: Observable<GenericUser>;

  constructor(private _auth: AuthService, private _service: UserService, _router: Router) {
    const userData: User | null = this._auth.getUser();
    if (userData) {
      this._user = this._service.getUserDetails(userData.uid);
    } else {
      _router.navigate(['/login']);
      throw new Error('User not logged in');
    }
  }

}
