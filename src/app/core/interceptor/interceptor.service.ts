import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  private jwt;

  constructor(private _jwtService: JwtService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.getToken();
    if (this.jwt) {
      let token = JSON.parse(this.jwt).access_token;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return next.handle(req.clone({ headers }));

    }

    return next.handle(req);
  }

  private getToken() {
    this.jwt = this._jwtService.getJwt();
  }
}