import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadParInterceptor } from 'src/app/core-module/interceptors/header-interceptor';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
  ],
  declarations: [PagesComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeadParInterceptor,
    multi: true
  }],
})
export class PagesModule { }
