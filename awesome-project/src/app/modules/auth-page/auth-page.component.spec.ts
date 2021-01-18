import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {AuthPageComponent} from './auth-page.component';
import {UserService} from '../../core/services/user.service';
import {AuthService} from '../../core/services/auth.service';

describe('WelcomePageComponent', () => {
  let fixture: ComponentFixture<AuthPageComponent>;
  let mockRouter;
  let mockUserService;
  let mockAuthService;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockUserService = jasmine.createSpyObj(['getUsers']);
    mockAuthService = jasmine.createSpyObj(['login']);
    TestBed.configureTestingModule({
      declarations: [
        AuthPageComponent
      ],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: UserService, useValue: mockUserService},
        {provide: AuthService, useValue: mockAuthService}
      ],
    });
    fixture = TestBed.createComponent(AuthPageComponent);
  });

  it('should have a defined component', () => {
    expect(fixture).toBeTruthy();
  });

  it('should display correct Authorization message', () => {
    const deH = fixture.debugElement.query(By.css('h1'));
    expect(deH.nativeElement.textContent).toContain('AWESOME PROJECT');
  });

  it('should have correct values in variables then initialized', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.hide).toBe(true);
    expect(fixture.componentInstance.userNotFound).toBe(false);
  });


});
