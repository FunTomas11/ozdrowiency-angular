import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [FirebaseService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ozdrowiency-angular';

  constructor(private firebaseService: FirebaseService) {}
  
  ngOnInit() {
    this.firebaseService.test();
  }
}