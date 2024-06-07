import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "firebase/auth";
import {UserService} from "../../services/user.service";
import {UserDetails, UserRole} from "../../models/user.model";
import {TherapistComponent} from "../therapist/therapist.component";
import {PatientComponent} from "../patient/patient.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TherapistComponent,
    PatientComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private _user: UserDetails;

  get user(): UserDetails {
    return this._user;
  }

  constructor(private _auth: AuthService, private _service: UserService) {
    this._user = {email: '', id: '', name: '', password: '', surname: '', role: ''};
    const userData: User | null = this._auth.getUser();
    if (userData) {
      this._service.getUserDetails(userData.uid).subscribe((user: UserDetails) => {
        this._user = user;
      });
    }
  }

  protected readonly UserRole = UserRole;
}
