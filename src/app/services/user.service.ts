import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {GenericUser, Patient} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Form} from "../models/form.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getUserDetails(userId: string): Observable<GenericUser> {
    return this._http.get<GenericUser>(`${this._apiUrl}/users/${userId}`);
  }

  getDoctorsPatients(doctorId: string): Observable<Patient[]> {
    return this._http.get<Patient[]>(`${this._apiUrl}/users?doctorId=${doctorId}&role=patient`);
  }

  getDoctorsStats(doctorId: string): Observable<Form[]> {
    return this._http.get<Form[]>(`${this._apiUrl}/answers?doctorId=${doctorId}`);
  }
}
