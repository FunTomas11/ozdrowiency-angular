import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User | null = null;
  private readonly _loginUrl = environment.apiUrl + '/users/login';

  constructor(private _router: Router, private _http: HttpClient) {}

  login(email: string, password: string) {
    return this._http.post(this._loginUrl, { email, password })
      .pipe(
        tap(resp => this.setUser(resp as User)),
        tap(() => this._router.navigate(['/']))
      )
  }

  // Method to set user data
  setUser(userData: User): void {
    this._user = userData;
    sessionStorage.setItem('user', JSON.stringify(userData));
  }

  // Method to get user data
  getUser(): User | null {
    if (this._user === null) {
      const user = sessionStorage.getItem('user');
      if (user) {
        this._user = JSON.parse(user);
      }
    }
    return this._user;
  }

  // Method to check if user is logged in
  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  // Method to clear user data (logout)
  clearUser(): void {
    this._user = null;
    sessionStorage.removeItem('user');
    this._router.navigate(['/login']);
  }
}
