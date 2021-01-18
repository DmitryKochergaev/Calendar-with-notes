import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {UserApi} from '../http/user-api';
import {of} from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let apiServiceSpy: jasmine.SpyObj<UserApi>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['authUser', 'updateUser']);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        {provide: UserApi, useValue: spy}
      ]
    });
    service = TestBed.inject(UserService);
    apiServiceSpy = TestBed.inject(UserApi) as jasmine.SpyObj<UserApi>;
  });

  it('should call updateUser once', () => {
    const userStub = {
      userName: '123',
      password: '123',
      id: 1
    };

    apiServiceSpy.updateUser.and.returnValue(of(true));
    service.updateUser(userStub);
    expect(apiServiceSpy.updateUser.calls.count()).toBe(1);
  });

});
