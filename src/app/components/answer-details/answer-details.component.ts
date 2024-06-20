import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionsService} from '../../services/questions.service';
import {Observable} from 'rxjs';
import {AnswerItem} from '../../models/form.model';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatDivider} from "@angular/material/divider"; // Adjust the import according to your project structure

@Component({
  standalone: true,
  selector: 'app-answer-details',
  templateUrl: './answer-details.component.html',
  styleUrls: ['./answer-details.component.scss'],
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    DatePipe,
    MatDivider
  ]
})
export class AnswerDetailsComponent implements OnInit {
  _answerId: string;
  answer$!: Observable<AnswerItem>;

  constructor(private _route: ActivatedRoute, private _questions: QuestionsService) {
    this._answerId = this._route.snapshot.params['answerId'];
  }

  ngOnInit(): void {
    this.answer$ = this._questions.getAnswers(this._answerId);
    this.answer$.subscribe(
      data => {
        console.log('Data received:', data);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  stringify(data: any): string {
    console.log('Data:', data)
    return JSON.stringify(data, null, 2);
  }
}
