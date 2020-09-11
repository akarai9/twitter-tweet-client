import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children:[
    {
      path: '',
      redirectTo: 'get-tweets',
      pathMatch: 'full'
    },
    {
      path: 'get-tweets',
      loadChildren: './get-tweets/get-tweets.module#GetTweetsModule',
    },
    {
      path: 'tweets-metric',
      loadChildren: './show-metric/show-metric.module#ShowMetricModule',
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
