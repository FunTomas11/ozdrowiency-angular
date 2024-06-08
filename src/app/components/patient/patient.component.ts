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
import {Answer, Form} from "../../models/form.model";
import {FormsModule} from "@angular/forms";
import {v4 as uuidv4} from 'uuid';

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
    FormsModule
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent implements OnInit, OnDestroy {
  @Input() set user(userData: GenericUser) {
    this._user = userData as Patient;
    this.doctor$ = this._userService.getUserDetails(this.user.doctorId) as Observable<Doctor>;
  };

  get user(): Patient {
    return this._user;
  }

  doctor$!: Observable<Doctor>;
  answers: Answer[] = [];

  private _user!: Patient;
  private _destroy$ = new Subject<void>();

  constructor(private _userService: UserService, private _questions: QuestionsService) {

  }

  ngOnInit(): void {
    this._questions.getQuestions()
      .pipe(takeUntil(this._destroy$))
      .subscribe(questions => {
      // Remap the questions to include the answer
      this.answers = questions.map(question => ({
        ...question,
        answer: 5
      }));
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }


  approve() {
    const form: Form  = {
      id: uuidv4(),
      date: new Date().toISOString(),
      patientId: this.user.id,
      doctorId: this.user.doctorId,
      score: this.answers.reduce((acc, curr) => acc + curr.answer, 0),
      answers: this.answers
    }
    this._questions.saveAnswers(form).subscribe(() => console.log('Form saved'));
  }
}
