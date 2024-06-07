import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatToolbarModule} from "@angular/material/toolbar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatDialogModule, MatToolbarModule],
  providers: [FirebaseService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private _isLoggedIn = false;

  constructor(private firebaseService: FirebaseService, private _dialog: MatDialog) {}

  ngOnInit() {

  }
}
