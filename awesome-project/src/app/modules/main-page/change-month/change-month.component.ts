import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MonthsService} from '../../../core/services/months.service';

@Component({
  selector: 'app-change-month',
  templateUrl: './change-month.component.html',
  styleUrls: ['./change-month.component.css']
})
export class ChangeMonthComponent implements OnInit {
  form: FormGroup;
  matSelectValue: string;

  constructor(private _dialogRef: MatDialogRef<ChangeMonthComponent>,
              private _monthService: MonthsService
  ) {
  }

  ngOnInit(): void {
    this._monthService.getCurrentMonthName()
      .pipe()
      .subscribe({
        next: value => {
          this.form = new FormGroup({
            currentMonth: new FormControl(value, [Validators.required]),
          });
          this.matSelectValue = value;
        }
      });
  }

  onSaveClick(): void {
    if (this.form.valid) {
      this._monthService.setCurrentMonthName(this.form.value.currentMonth);
      this._dialogRef.close();
    }
  }

  onDiscardClick(): void {
    this._dialogRef.close();
  }

}
