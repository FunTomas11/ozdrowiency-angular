import {Injectable} from '@angular/core';
import {User} from "firebase/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private _user: User | null | any = null;
  private _user: User | null | any = { uid: '5'};

  constructor(private _router: Router) {}

  // Method to set user data
  setUser(userData: User): void {
    this._user = userData;
  }

  // Method to get user data
  getUser(): User | null {
    return this._user;
  }

  // Method to check if user is logged in
  isLoggedIn(): boolean {
    return this._user !== null;
  }

  // Method to clear user data (logout)
  clearUser(): void {
    this._user = null;
    this._router.navigate(['/login']);
  }
}
