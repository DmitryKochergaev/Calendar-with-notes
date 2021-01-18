import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserPageComponent} from './user-page.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent
  }
];

@NgModule({
  declarations: [UserPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
  ]
})
export class UserPageModule {
}
