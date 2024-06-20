import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Doctor, GenericUser, Patient} from "../../models/user.model";
import {UserAreaComponent} from "../user-area/user-area.component";
import {AsyncPipe, DatePipe} from "@angular/common";
import {Observable, Subject, takeUntil} from "rxjs";
import {UserService} from "../../services/user.service";
import {QuestionsService} from "../../services/questions.service";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {CdkScrollable} from "@angular/cdk/overlay";
import {MatButton} from "@angular/material/button";
import {Answer, AnswerItem} from "../../models/form.model";
import {FormsModule} from "@angular/forms";
import {v4 as uuidv4} from 'uuid';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    UserAreaComponent,
    DatePipe,
    AsyncPipe,
    MatSlider,
    MatSliderThumb,
    CdkScrollable,
    MatButton,
    FormsModule,
    MatPaginator,
    MatIcon
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent implements OnInit, OnDestroy {
  @Input() set user(userData: GenericUser) {
    this._user = userData as Patient;
    this.doctor$ = this._userService.getUserDetails(this.user.doctorId) as Observable<Doctor>;
    this._userService.getUserStats(this.user.id).subscribe(answers => {
      this.alreadyAnswered = this._isAlreadyAnswered(answers);
    })
  };

  get user(): Patient {
    return this._user;
  }

  doctor$!: Observable<Doctor>;
  answers: Answer[] = [];
  pagedAnswers: Answer[] = [];
  alreadyAnswered: boolean = false;

  private _user!: Patient;
  private _destroy$ = new Subject<void>();

  constructor(private _userService: UserService,
              private _questions: QuestionsService,
              private _dialog: MatDialog,
              private _snack: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this._getQuestions(1);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }


  approve() {
    this._dialog.open(ConfirmationDialogComponent).afterClosed().subscribe((result) => {
      if (result) {
        this.answers.push(...this.pagedAnswers);
        const form: AnswerItem = {
          id: uuidv4(),
          date: new Date().toISOString(),
          patientId: this.user.id,
          doctorId: this.user.doctorId,
          score: this.answers.reduce((acc, curr) => acc + curr.answer, 0),
          answers: this.answers
        }
        this._questions.saveAnswers(form).subscribe(() => {
          this.alreadyAnswered = true;
          this._snack.open('Answer sent successfully', 'Close', {
            duration: 2000
          });
        });
      }
    });
  }

  onPageChange($event: PageEvent) {
    this.pushIfNotExists(this.answers, this.pagedAnswers);
    this._getQuestions($event.pageIndex + 1);
  }

  private _getQuestions(page: number) {
    this._questions.getQuestions(page)
      .pipe(takeUntil(this._destroy$))
      .subscribe(questions => {
        const answerMap = new Map(this.answers.map(ans => [ans.id, ans.answer]));
        this.pagedAnswers = questions.map(question => ({
          ...question,
          answer: answerMap.get(question.id) || 0
        }));
      });
  }


  pushIfNotExists(targetArray: any, sourceArray: any) {
    sourceArray.forEach((element: any) => {
      if (!targetArray.find((el: any) => el.id === element.id)) {
        targetArray.push(element);
      }
    });
  }

  private _isAlreadyAnswered(answers: AnswerItem[]) {
    if (answers.length === 0) {
      return false;
    }

    const lastAnswer = answers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    return new Date().getTime() - new Date(lastAnswer.date).getTime() < 1000 * 60 * 60 * 24 * 14;
  }
}
