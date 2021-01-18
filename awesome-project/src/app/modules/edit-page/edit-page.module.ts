import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditPageComponent} from './edit-page.component';
import {RouterModule, Routes} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';


const routes: Routes = [
  {
    path: '',
    component: EditPageComponent
  }
];

@NgModule({
  declarations: [EditPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})

export class EditPageModule {

}


