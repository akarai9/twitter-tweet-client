import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowMetricComponent } from './show-metric.component';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ShowMetricComponent
  }
]
@NgModule({
  declarations: [ShowMetricComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[ThemeService]
})
export class ShowMetricModule { }
