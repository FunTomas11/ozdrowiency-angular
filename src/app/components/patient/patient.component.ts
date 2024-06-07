import {Component, Input} from '@angular/core';
import {UserAbstract} from "../../abstract/user.abstract";
import {UserDetails} from "../../models/user.model";

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent implements UserAbstract {
  @Input() user!: UserDetails;

}
