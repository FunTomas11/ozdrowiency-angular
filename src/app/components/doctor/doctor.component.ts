import {Component, Input, OnDestroy} from '@angular/core';
import {Doctor, GenericUser, Patient} from "../../models/user.model";
import {UserAreaComponent} from "../user-area/user-area.component";
import {Observable, of, Subject, takeUntil} from "rxjs";
import {UserService} from "../../services/user.service";
import {MatExpansionModule} from "@angular/material/expansion";
import {AsyncPipe, DatePipe} from "@angular/common";
import {Form} from "../../models/form.model";
import {MatListModule} from "@angular/material/list";
import {MatLine} from "@angular/material/core";

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [
    UserAreaComponent,
    AsyncPipe,
    MatExpansionModule,
    MatListModule,
    MatLine,
    DatePipe
  ],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss'
})
export class DoctorComponent implements OnDestroy {
  @Input() set user(userData: GenericUser) {
    this._user = userData as Doctor;
    this._init();
  };

  patients$: Observable<Patient[]> = of([]);
  stats: Form[] = [];

  get user(): Doctor {
    return this._user;
  }

  private _destroy$ = new Subject<void>();
  private _user!: Doctor;

  constructor(private _users: UserService) {
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  isPatientScored(patientId: string): boolean {
    return this.stats.some(stat => stat.patientId === patientId);
  }

  getPatientAvgScore(patientId: string): number {
    const patientAnswers = this.getPatientAnswers(patientId);
    const totalScore = patientAnswers.reduce((acc, answer) => acc + answer.score, 0);
    return totalScore / patientAnswers.length;
  }

  getPatientAnswers(patientId: string): Form[] {
    return this.stats.filter(stat => stat.patientId === patientId);
  }

  private _init(): void {
    this.patients$ = this._users.getDoctorsPatients(this.user.id);
    this._users.getDoctorsStats(this.user.id)
      .pipe(takeUntil(this._destroy$))
      .subscribe(stats => this.stats = stats);
  }

}
