import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from './main-page.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ROUTE} from '../../shared/routes/routes';
import {ChangeMonthComponent} from './change-month/change-month.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
  },
  {
    path: `${ROUTE.user}`,
    loadChildren: () => import('../user-page/user-page.module').then(m => m.UserPageModule)
  },
  {
    path: `:id/${ROUTE.edit}`,
    pathMatch: 'full',
    loadChildren: () => import('../edit-page/edit-page.module').then(m => m.EditPageModule)
  }
];

@NgModule({
  declarations: [MainPageComponent, ChangeMonthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
  ]
})
export class MainPageModule {
}
