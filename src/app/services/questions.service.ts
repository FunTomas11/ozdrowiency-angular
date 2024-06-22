import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {AnswerItem, Question} from "../models/form.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private readonly _questionsUrl = environment.apiUrl + '/questions';
  private readonly _answersUrl = environment.apiUrl + '/answers';

  constructor(private _http: HttpClient) {
    console.log('Questions URL:', this._questionsUrl);
    console.log('Answers URL:', this._answersUrl);
  }

  getQuestions(page = 1): Observable<Question[]> {
    return this._http.get(this._questionsUrl + `?_page=${page}&_per_page=5`).pipe(
      // @ts-ignore
      map( resp => resp.data as unknown as Question[] )
    ) as Observable<Question[]>;
  }

  saveAnswers(form: AnswerItem): Observable<void> {
    return this._http.post(this._answersUrl, form) as unknown as Observable<void>;
  }

  getAnswers(answerId: string): Observable<AnswerItem> {
    return this._http.get<AnswerItem[]>(`${this._answersUrl}/${answerId}`)
      .pipe( map( (answers: AnswerItem[]) => answers[0] ) );
  }

}
