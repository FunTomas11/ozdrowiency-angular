import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FirebaseService} from '../../services/firebase.service';
import {MatDialogModule} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatDialogModule, CommonModule, FormsModule, MatInputModule, MatTabsModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private firebaseService: FirebaseService) {}

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.firebaseService.loginUser(email as string, password as string);
    }
  }

  register() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.firebaseService.registerUser(email as string, password as string);
    }
  }
}
