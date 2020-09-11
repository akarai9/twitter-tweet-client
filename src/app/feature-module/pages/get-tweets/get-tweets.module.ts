import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetTweetsComponent } from './get-tweets.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routes: Routes = [
  {
    path: '',
    component: GetTweetsComponent
  }
]

@NgModule({
  declarations: [GetTweetsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ]
})
export class GetTweetsModule { }
