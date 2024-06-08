import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {GenericUser} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getUserDetails(userId: string): Observable<GenericUser> {
    return this._http.get<GenericUser>(`${this._apiUrl}/users/${userId}`);
  }
}
