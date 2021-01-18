import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../../shared/interfaces/IUser';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})

export class UserApi {
  private _userUrl: string;

  constructor(private _http: HttpClient) {
    this._userUrl = 'api/users';
  }

  getUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(this._userUrl);
  }

  updateUser(user: IUser): Observable<any> {
    return this._http.patch(`${this._userUrl}/${user.id}`, user);
  }

}
