import {Component, Input} from '@angular/core';
import {UserDetails, UserRole} from "../../models/user.model";
import {MatIcon} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButton} from "@angular/material/button";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-user-area',
  standalone: true,
  imports: [
    MatIcon, MatTooltipModule, MatButton, NgClass
  ],
  templateUrl: './user-area.component.html',
  styleUrl: './user-area.component.scss',

})
export class UserAreaComponent {
  protected readonly UserRole = UserRole;
  @Input({required: true}) user!: UserDetails;

}
