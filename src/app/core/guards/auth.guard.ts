import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, UrlSegment, CanLoad } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private _authService: AuthService, private _router: Router) { }

  async canLoad(route: Route, segments: UrlSegment[]) {
    const isLogin = <boolean>await this._authService.isAuthenticated();
    if (!isLogin) {
      this._router.navigate(['/authentication/login']);
    }
    return isLogin;
  }

}
