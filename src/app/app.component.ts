import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FirebaseService} from './services/firebase.service';
import {MatDialogModule} from "@angular/material/dialog";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatDialogModule, MatToolbarModule, MatButton],
  providers: [FirebaseService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

}
