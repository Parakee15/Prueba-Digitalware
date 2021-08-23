import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService,
    private _router: Router,
    private _alertService: AlertService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(e => {
        switch (e.status) {
          case 401:
            this._alertService.openSwal({
              title: 'Error',
              text: 'Tu sesión ha expirado, inicia sesión nuevamente',
              icon: 'warning',
            });
            this._authService.logOut().then(() => this._router.navigate(['/authentication/login']));
            break;
          case 300:
            this._alertService.openSwal({
              title: 'Error',
              text: e.error.error,
              icon: 'warning',
            });
            break;
          default:
            this._alertService.openSwal({
              title: 'Error',
              text: 'Ocurrio un error procesando la transacción',
              icon: 'warning',
            });
            break;
        }
        return throwError(e);
      })
    );
  }
}
