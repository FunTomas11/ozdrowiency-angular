import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {GenericUser, Patient} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AnswerItem} from "../models/form.model";

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

  getDoctorsStats(doctorId: string): Observable<AnswerItem[]> {
    return this._http.get<AnswerItem[]>(`${this._apiUrl}/answers?doctorId=${doctorId}`);
  }

  getUserStats(userId: string): Observable<AnswerItem[]> {
    return this._http.get<AnswerItem[]>(`${this._apiUrl}/answers?patientId=${userId}`);
  }
}
