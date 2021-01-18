import {Injectable} from '@angular/core';
import {IUser} from '../../shared/interfaces/IUser';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {UserApi} from '../http/user-api';

@Injectable({providedIn: 'root'})

export class AuthService {
  private _user: IUser;

  constructor(private _userApi: UserApi) {
  }

  isAuthenticated(): boolean {
    return !!this._user;
  }

  getUser(): IUser {
    return this._user;
  }

  authUser(userData: any): Observable<boolean> {
    return this._userApi.getUsers()
      .pipe(
        switchMap(value => {
          for (const user of value) {
            if (user.userName === userData.userName && user.password === userData.password) {
              this.login(user);
              return of(true);
            }
          }
          return of(false);
        })
      );
  }

  login(user: IUser): void {
    this._user = {
      userName: user.userName,
      password: user.password,
      id: user.id
    };
  }

  logout(): void {
    this._user = null;
  }

}
