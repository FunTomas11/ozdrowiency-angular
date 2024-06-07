import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {LoginComponent} from "./components/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatDialogModule],
  providers: [FirebaseService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private _isLoggedIn = false;

  constructor(private firebaseService: FirebaseService, private _dialog: MatDialog) {}

  ngOnInit() {
    this.firebaseService.test();
    if (!this._isLoggedIn) {
      this._dialog.open(LoginComponent, {
        width: '400px',
        disableClose: true
      });
    }
  }
}
