import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ROUTE} from '../../shared/routes/routes';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  hide: boolean;
  userNotFound: boolean;
  private _notifier: Subject<any>;

  constructor(private _authService: AuthService,
              private _router: Router) {
    this._notifier = new Subject();
    this.userNotFound = false;
    this.hide = true;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onShowClick(): void {
    this.hide = !this.hide;
  }

  onAuthClick(): void {
    if (this.form.valid) {
      this._authService.authUser(this.form.value)
        .pipe(
          takeUntil(this._notifier)
        )
        .subscribe(value => {
          if (value) {
            this._router.navigate([ROUTE.main]);
          } else {
            this.userNotFound = true;
          }
        });
    }
  }

  ngOnDestroy(): void {
    this._notifier.next();
    this._notifier.complete();
  }
}
