import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {map, Observable} from "rxjs";
import {AnswerItem, Question} from "../models/form.model";
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

  saveAnswers(form: AnswerItem): Observable<void> {
    return this._http.post(this._answersUrl, form) as unknown as Observable<void>;
  }

  getAnswers(answerId: string): Observable<AnswerItem> {
    return this._http.get<AnswerItem[]>(`${this._answersUrl}?id=${answerId}`)
      .pipe( map( (answers: AnswerItem[]) => answers[0] ) );
  }
}
