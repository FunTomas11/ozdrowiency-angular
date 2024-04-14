import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private backend: FirebaseApp;

  constructor() {
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
    console.log(this.backend);
  }

  registerUser(email: string, password: string) {
    const auth = getAuth(this.backend);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
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



