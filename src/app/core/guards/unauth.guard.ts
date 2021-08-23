import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanLoad {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }
  async canLoad(route: Route, segments: UrlSegment[]) {
    const isLogin = <boolean>await this._authService.isAuthenticated();
    if (isLogin) {
      this._router.navigate(['/dashboard']);
    }
    return !isLogin;
  }

}
