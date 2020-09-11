import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core-module/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'feature',
    pathMatch: 'full'
  },
  {
    path: 'feature',
    loadChildren: './feature-module/pages/pages.module#PagesModule',
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
