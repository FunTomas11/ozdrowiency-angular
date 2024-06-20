import {Component, Input, OnDestroy} from '@angular/core';
import {Doctor, GenericUser, Patient} from "../../models/user.model";
import {UserAreaComponent} from "../user-area/user-area.component";
import {Observable, of, Subject, takeUntil} from "rxjs";
import {UserService} from "../../services/user.service";
import {MatExpansionModule} from "@angular/material/expansion";
import {AsyncPipe, DatePipe} from "@angular/common";
import {AnswerItem} from "../../models/form.model";
import {MatListModule} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {RouterLink} from "@angular/router";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [
    UserAreaComponent,
    AsyncPipe,
    MatExpansionModule,
    MatListModule,
    MatLine,
    DatePipe,
    RouterLink,
    MatIconButton,
    MatIcon,
    MatCheckbox,
    MatTab,
    MatTabGroup,
    MatTooltip
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
  stats: AnswerItem[] = [];

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

  isPatientQualified(patientId: string): boolean {
    return this.getPatientLastScore(patientId) >= 50;
  }

  getPatientLastScore(patientId: string): number {
    return this.getPatientLastAnswer(patientId)?.score ?? 0;
  }

  getPatientLastAnswer(patientId: string): AnswerItem | null {
    const patientAnswers = this.getPatientAnswers(patientId);
    return patientAnswers.length ? patientAnswers[0] : null;
  }

  getPatientAnswers(patientId: string): AnswerItem[] {
    return this.stats.filter(stat => stat.patientId === patientId);
  }

  getPatientTooltip(patientId: string): string {
    const lastAnswer = this.getPatientLastAnswer(patientId);
    if (lastAnswer && lastAnswer?.score >= 50) {
      return `Patient qualified for a visit`;
    }
    return '';
  }

  private _init(): void {
    this.patients$ = this._users.getDoctorsPatients(this.user.id);
    this._users.getDoctorsStats(this.user.id)
      .pipe(takeUntil(this._destroy$))
      .subscribe(stats => {
        return this.stats = stats.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      });
  }

}
