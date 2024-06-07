import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { environment } from '../../environments/environment.development';
import {AuthService} from "./auth.service";
import {User} from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private readonly backend: FirebaseApp;

  constructor(private _authService: AuthService) {
    const firebaseConfig = {
      apiKey: environment.firebaseApiKey,
      authDomain: environment.authDomain,
      projectId: environment.projectId,
      storageBucket: environment.storageBucket,
      messagingSenderId: environment.messagingSenderId,
      appId: environment.appId
    };

    this.backend = initializeApp(firebaseConfig);
  }

  test() {
    console.log('Firebase service works!');
  }

  registerUser(email: string, password: string) {
    const auth = getAuth(this.backend);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user: User = userCredential.user;
        this._authService.setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  loginUser(email: string, password: string) {
    const auth = getAuth(this.backend);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}



