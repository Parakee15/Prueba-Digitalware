import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { InterceptorService } from './interceptor/interceptor.service';
import { SessionStorageService } from './services/session-storage.service';
import { AlertService } from './services/alert.service';
import { LocalStorageService } from './services/local-storage.service';
import { JwtService } from './services/jwt.service';
import { ErrorInterceptor } from './interceptor/error.interceptor';


@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    SessionStorageService,
    AlertService,
    LocalStorageService,
    JwtService
  ]
})
export class CoreModule { }
