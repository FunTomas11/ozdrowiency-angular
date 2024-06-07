import {Component, Input} from '@angular/core';
import {UserAbstract} from "../../abstract/user.abstract";
import {UserDetails} from "../../models/user.model";

@Component({
  selector: 'app-therapist',
  standalone: true,
  imports: [],
  templateUrl: './therapist.component.html',
  styleUrl: './therapist.component.scss'
})
export class TherapistComponent implements UserAbstract {
  @Input() user!: UserDetails;

}
