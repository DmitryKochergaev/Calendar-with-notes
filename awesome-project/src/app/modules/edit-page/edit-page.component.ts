import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MonthsService} from '../../core/services/months.service';
import {IDay, IPlan} from '../../shared/interfaces/IMonth';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ROUTE} from '../../shared/routes/routes';
import {ICONS} from './icon-names';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit, OnDestroy {
  currentMonth: string;
  day: IDay;
  ICONS: string[];
  nothingPlaned: boolean;
  loading: boolean;
  form: FormGroup;
  private _notifier: Subject<any>;


  constructor(private _activatedRouter: ActivatedRoute,
              private _monthService: MonthsService,
              private _router: Router,
              private _fb: FormBuilder) {
    this.ICONS = ICONS;
    this.loading = true;
    this.nothingPlaned = true;
    this._notifier = new Subject();
  }


  ngOnInit(): void {
    this._monthService.getCurrentMonthName()
      .pipe(
        takeUntil(this._notifier)
      )
      .subscribe(value => this.currentMonth = value);

    this.form = this._fb.group({
      plans: this._fb.array([]),
    });

    this._activatedRouter.params.subscribe((params: Params) => {
      this._monthService.getDayOfMonth(this.currentMonth, +params.id - 1)
        .pipe()
        .subscribe({
          next: value => this.day = value,
          complete: () => {
            if (this.day.plans) {
              this._setPlans(this.day.plans);
            }
            this.loading = false;
          }
        });
    });
  }

  trackByFn(index: any): any {
    return index;
  }

  private _setPlans(plans: IPlan[]): void {
    this.nothingPlaned = false;
    const form = this.form.controls.plans as FormArray;

    plans.forEach(plan => {
      form.push(this._fb.group({
        icon: new FormControl(plan.icon),
        header: new FormControl(plan.header, [Validators.required]),
        text: new FormControl(plan.text, [Validators.required]),
      }));
    });
  }

  onAddPlan(): void {
    this.nothingPlaned = false;
    const plans = this.form.controls.plans as FormArray;

    plans.push(this._fb.group({
      icon: new FormControl('clock'),
      header: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
    }));
  }

  onSubmit(formValue: any): void {
    if (this.form.valid) {
      this._monthService.updatePlans(this.currentMonth, this.day, formValue.plans)
        .pipe(
          takeUntil(this._notifier)
        )
        .subscribe({
          complete: () => this._navigateToMain()
        });
    }
  }

  private _navigateToMain(): void {
    this._router.navigate([ROUTE.main]);
  }

  onCancel(): void {
    this._navigateToMain();
  }

  ngOnDestroy(): void {
    this._notifier.next();
    this._notifier.complete();
  }
}
