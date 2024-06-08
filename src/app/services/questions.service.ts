import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {Form, Question} from "../models/form.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private readonly _questionsUrl = environment.apiUrl + '/questions';
  private readonly _answersUrl = environment.apiUrl + '/answers';

  constructor(private _http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this._http.get(this._questionsUrl) as Observable<Question[]>;
  }

  saveAnswers(form: Form): Observable<void> {
    return this._http.post(this._answersUrl, form) as unknown as Observable<void>;
  }
}
