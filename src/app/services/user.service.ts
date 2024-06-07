import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {UserDetails} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserDetails(userId: string): Observable<UserDetails> {
    const user: UserDetails = {email: "johndoe@example.com", id: "2", name: "John", password: "", surname: "Doe", role: "doctor"};
    return of(user);
  }
}
