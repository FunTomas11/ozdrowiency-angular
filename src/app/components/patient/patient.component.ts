import {Component, Input} from '@angular/core';
import {Doctor, GenericUser, Patient} from "../../models/user.model";
import {UserAreaComponent} from "../user-area/user-area.component";
import {AsyncPipe, DatePipe} from "@angular/common";
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    UserAreaComponent,
    DatePipe,
    AsyncPipe
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent {
  @Input() set user(userData: GenericUser) {
    this._user = userData as Patient;
    this.doctor = this._userService.getUserDetails(this.user.doctorId) as Observable<Doctor>;
  };

  get user(): Patient {
    return this._user;
  }

  doctor!: Observable<Doctor>;

  private _user!: Patient;

  constructor(private _userService: UserService ) {
  }


}
