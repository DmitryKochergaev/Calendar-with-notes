import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ROUTE} from './shared/routes/routes';
import {AuthGuard} from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: `${ROUTE.authPage}`,
    pathMatch: 'full',
    loadChildren: () => import('./modules/auth-page/auth-page.module').then(m => m.AuthPageModule)
  },
  {
    path: `${ROUTE.main}`,
    loadChildren: () => import('./modules/main-page/main-page.module').then(m => m.MainPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `${ROUTE.authPage}`
  },
  {
    path: '**',
    redirectTo: `${ROUTE.authPage}`
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
