import {Component, Input} from '@angular/core';
import {Doctor, GenericUser} from "../../models/user.model";
import {UserAreaComponent} from "../user-area/user-area.component";

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [
    UserAreaComponent
  ],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss'
})
export class DoctorComponent {
  @Input() set user(userData: GenericUser) {
    this._user = userData as Doctor;
  };

  get user(): Doctor {
    return this._user;
  }

  private _user!: Doctor;

  constructor() {
  }

}
