import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {MonthsApi} from '../http/months-api';
import {IDay, IMonth, IPlan} from '../../shared/interfaces/IMonth';
import {filter, map, switchMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class MonthsService {

  private _currentMonthName: BehaviorSubject<string>;
  private _currentMonth: Subject<string>;

  constructor(private _monthsApi: MonthsApi) {
    this._currentMonthName = new BehaviorSubject<string>('january');
    this._currentMonth = new Subject<string>();
  }

  setCurrentMonthName(month: string): void {
    this._currentMonthName.next(month);
  }

  getCurrentMonthName(): Observable<string> {
    return this._currentMonthName.asObservable();
  }

  getMonths(): Observable<IMonth[]> {
    return this._monthsApi.getMonths();
  }

  clearPlans(month: IMonth): Observable<any> {
    return this._monthsApi.updatePlans(month);
  }

  getDayOfMonth(monthName: string, day: number): Observable<IDay> {
    return this._monthsApi.getMonths()
      .pipe(
        map(value => {
          return value.filter(month => month.name === monthName).pop().days[day];
        })
      );
  }

  updatePlans(monthName: string, day: IDay, plans: IPlan[]): Observable<any> {
    return this._monthsApi.getMonths()
      .pipe(
        switchMap(months => {
          const month = months.filter(val => val.name === monthName).pop();
          month.days[day.day - 1].plans = plans;
          return this._monthsApi.updatePlans(month);
        })
      );
  }

}
